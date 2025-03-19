import { useContext, useState, useEffect } from "react";
import { PaymentsProvider, usePayments } from "../../context/PaymentsContext";
import { AuthContext } from "../../context/AuthContext";
import { addPayment } from "../../API/api";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentsData.length) {
      setLoading(false);
      const uniqueTrainees = [...new Set(paymentsData.map((p) => p.traineeId))];
      setTrainees(uniqueTrainees);
    }
  }, [paymentsData]);

  if (!user) return <p className="text-center text-lg font-semibold">טוען נתונים...</p>;

  const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);

  const filteredPayments = traineeId
    ? paymentsData.filter((p) => p.traineeId === traineeId)
    : paymentsData;

  const handleAddPayment = async () => {
    if (!traineeId || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return alert("נא להזין פרטים תקינים");
    }

    try {
      const paymentId = await addPayment(user.uid, traineeId, sessionId, parseFloat(amount));
      setPaymentsData([...paymentsData, { id: paymentId, traineeId, sessionId, amount: parseFloat(amount) }]);
      setAmount("");
    } catch (error) {
      console.error("שגיאה בהוספת תשלום:", error);
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>ניהול תשלומים</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold mb-4">סה"כ הכנסות: ₪{totalRevenue.toLocaleString()}</p>

        <Select onValueChange={setTraineeId} value={traineeId}>
          <SelectItem value="">כל המתאמנים</SelectItem>
          {trainees.map((id) => (
            <SelectItem key={id} value={id}>
              מתאמן {id}
            </SelectItem>
          ))}
        </Select>

        {loading ? (
          <p className="text-center mt-4">טוען נתונים...</p>
        ) : filteredPayments.length > 0 ? (
          <ul className="mt-4">
            {filteredPayments.map((p) => (
              <li key={p.id} className="border p-2 rounded mb-2">
                מתאמן: {p.traineeId} | סכום: ₪{p.amount} | אימון: {p.sessionId || "לא צוין"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-4 text-gray-500">אין תשלומים להצגה.</p>
        )}

        <div className="mt-6 space-y-2">
          <Input placeholder="מזהה מתאמן" value={traineeId} onChange={(e) => setTraineeId(e.target.value)} />
          <Input placeholder="מזהה אימון (לא חובה)" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
          <Input type="number" placeholder="סכום תשלום" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button onClick={handleAddPayment}>הוסף תשלום</Button>
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
