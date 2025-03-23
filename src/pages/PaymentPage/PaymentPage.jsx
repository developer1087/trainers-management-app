  import { useContext, useState, useEffect } from "react";
  import { PaymentsProvider, usePayments } from "../../context/PaymentsContext";
  import { AuthContext } from "../../context/AuthContext";
  import { addPayment, traineesList, fetchPayments, sessionsList } from "../../API/api"; // Add fetchSessions
  import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
  import { Button } from "../../components/ui/Button";
  import { Select, SelectItem } from "../../components/ui/Select";
  import { Input } from "../../components/ui/Input";

  const PaymentPage = () => {
    const { user } = useContext(AuthContext);
    const { paymentsData, setPaymentsData } = usePayments();
    const [traineeId, setTraineeId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [amount, setAmount] = useState("");
    const [trainees, setTrainees] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredSessions, setFilteredSessions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Fetch trainees, payments, and sessions data
          const [traineesListData, paymentsListData, sessionsListData] = await Promise.all([
            traineesList(user.uid),
            fetchPayments(user.uid),
            sessionsList(user.uid) // You'll need to implement this API function
          ]);
          
          setTrainees(traineesListData);
          setPaymentsData(paymentsListData);
          setSessions(sessionsListData);
        } catch (error) {
          console.error("שגיאה בטעינת הנתונים:", error);
        } finally {
          setLoading(false);
        }
      };

      if (user) {
        fetchData();
      }
    }, [user, setPaymentsData]);

    // Update filtered sessions when trainee is selected
    useEffect(() => {
      if (!traineeId) {
        setFilteredSessions([]);
        setSessionId("");
        setAmount("");
        return;
      }
      
      const traineeSpecificSessions = sessions.filter(session => session.traineeId === traineeId);
      setFilteredSessions(traineeSpecificSessions);
      setSessionId("");
      setAmount("");
    }, [traineeId, sessions]);

    // Set amount based on selected session
    useEffect(() => {
      if (!sessionId) {
        setAmount("");
        return;
      }
      
      const selectedSession = sessions.find(session => session.id === sessionId);
      if (selectedSession && selectedSession.price) {
        setAmount(selectedSession.price.toString());
      }
    }, [sessionId, sessions]);

    if (!user) return <p className="text-center text-lg font-semibold">טוען נתונים...</p>;

    const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);

    const filteredPayments = traineeId
      ? paymentsData.filter((p) => p.traineeId === traineeId)
      : paymentsData;

      const handleAddPayment = async () => {
        if (!traineeId || !sessionId || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
          return alert("נא להזין פרטים תקינים");
        }

        try {
          const paymentId = await addPayment(user.uid, traineeId, sessionId, parseFloat(amount));
          setPaymentsData([...paymentsData, { id: paymentId, traineeId, sessionId, amount: parseFloat(amount) }]);
          setSessionId("");
          setAmount("");
        } catch (error) {
          console.error("שגיאה בהוספת תשלום:", error);
        }
      };

    // Create maps for trainee and session data
    const traineeMap = {};
    trainees.forEach((trainee) => {
      traineeMap[trainee.id] = `${trainee.fname || ''} ${trainee.lname || ''}`.trim();
    });

    const sessionMap = {};
    sessions.forEach((session) => {
      sessionMap[session.id] = `${session.date} - <span class="math-inline">\{session\.name\} \- ₪</span>{session.price}`;
    });

   // Calculate total debt for selected trainee
   const calculateTotalDebt = () => {
    if (!traineeId) return 0;
    const traineeSessions = sessions.filter(session => session.traineeId === traineeId);
    return traineeSessions.reduce((sum, session) => sum + (session.price || 0), 0);
  };

  // Calculate total payments for selected trainee
  const calculateTotalPayments = () => {
    if (!traineeId) return 0;
    const traineePayments = paymentsData.filter(payment => payment.traineeId === traineeId);
    return traineePayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  };

  const totalDebt = calculateTotalDebt();
  const totalPayments = calculateTotalPayments();
  const balance = totalDebt - totalPayments;

    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>ניהול תשלומים</CardTitle>
        </CardHeader>
        <CardContent>

        <div className="mb-4">
          <p className="text-xl font-bold">סה"כ חוב: ₪{totalDebt.toLocaleString()}</p>
          <p className="text-xl font-bold">סה"כ תשלומים: ₪{totalPayments.toLocaleString()}</p>
          <p className="text-xl font-bold">יתרה: ₪{balance.toLocaleString()}</p>
        </div>
          <Select
            onValueChange={(value) => setTraineeId(value)}
            value={traineeId}
          >
            <SelectItem value="">בחר מתאמן</SelectItem>
            {trainees.map((trainee) => (
              <SelectItem key={trainee.id} value={trainee.id}>
                {trainee.fname} {trainee.lname}
              </SelectItem>
            ))}
          </Select>

        

          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">הוספת תשלום חדש</h3>
            
         
            
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">בחר אימון</label>
              <Select 
                onValueChange={(value) => setSessionId(value)} 
                value={sessionId}
                disabled={!traineeId}
              >
                <SelectItem value="">בחר אימון</SelectItem>
                {filteredSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.date} - {session.name} - ₪{session.price}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">סכום תשלום</label>
              <Input 
                type="number" 
                placeholder="סכום תשלום" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div>
            
            <Button onClick={handleAddPayment} disabled={!traineeId || !sessionId || !amount}>
              הוסף תשלום
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PaymentWrapper = () => {
    return (
      <PaymentsProvider>
        <PaymentPage />  
      </PaymentsProvider>
    );
  }

  export default PaymentWrapper;