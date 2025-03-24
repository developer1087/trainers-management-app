import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.css"; // קובץ העיצוב
import { db } from "../../config/config";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import AddSessionForm from "../../components/AddSessionForm/AddSessionForm";
import { TraineesContext, TraineesProvider } from "../../context/TraineesContext";
import { SessionsContext, SessionsProvider } from "../../context/SessionsContext";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { fetchTrainerData, addSession, traineesList, sessionsList } from "../../API/api";


const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const { traineesData, setTraineesData } =
      useContext(TraineesContext);
  const { openSessionForm, setOpenSessionForm, sessionsData, setSessionsData } =
      useContext(SessionsContext);
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return; // Exit early if no user
  
    const fetchLocalTrainerData = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No user document found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
    const fetchData = async () => {
      try {
        const [traineesListData, sessionsListData] = await Promise.all([
          traineesList(user.uid),
          sessionsList(user.uid)
        ]);
        await fetchLocalTrainerData(); 
        setTraineesData(traineesListData);
        setSessionsData(sessionsListData);
      } catch (error) {
        console.error("שגיאה בטעינת הנתונים:", error);
      }
    };
  
    // Set up Firestore subscription
    const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "sessions"),
        (snapshot) => {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          start: new Date(doc.data().date + " " + doc.data().time),
          end: new Date(moment(doc.data().date + " " + doc.data().time).add(1, "hour")),
        }));
        setEvents(fetchedEvents);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      }
    );
  
    // Fetch initial data
    fetchData();
  
    return () => unsubscribe();
  }, [user, setTraineesData, setSessionsData]);
  
  
  const handleSelectSlot = ({ start }) => {
    console.log("Selected slot:", start);
    setSelectedSlot(start);
    setOpenSessionForm(true);
  };

  if (!user || loading) return <div>Loading...</div>;

  return (
    <div className="calendar-container">
     <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  style={{ height: 600 }}
  selectable
  onSelectSlot={handleSelectSlot} // בחירת סלוט
  onSelecting={() => false} // מונע בחירה של כמה סלוטים בטעות
  onSelectEvent={(event) => console.log("Clicked event:", event)} // בדיקה אם אפשר ללחוץ על אירוע
/>

      {selectedSlot && (
        <div className="modal">
            {traineesData && traineesData.length > 0 ? (
              <AddSessionForm
                traineesData={traineesData}
                addSession={addSession}
                setOpenSessionForm={setOpenSessionForm}
                initialDate={moment(selectedSlot).format("YYYY-MM-DD")}
                initialTime={moment(selectedSlot).format("HH:mm")}
              />
            ) : (
              <p className="no-trainees-message">אין מתאמנים רשומים</p>
            )}
        </div>
      )}
    </div>
  );
};

const CalendarWrapper = () => {
  return (
    <AuthProvider>
      <TraineesProvider>
        <SessionsProvider>
          <CalendarPage />
        </SessionsProvider>
      </TraineesProvider>
      </AuthProvider>
  );
};

export default CalendarWrapper;
