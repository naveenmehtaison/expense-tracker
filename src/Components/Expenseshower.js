import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreActions } from "./Store/ExpenseReducer";
import { TiDelete, TiEdit, TiUserAdd } from "react-icons/ti";

import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { PlusCircle } from 'lucide-react'; // Optional icon library
import { Plus } from "lucide-react";
import FileDownloader from "./PremiumActivities/FileDownloader";

// Firebase instances
const auth = getAuth();

const Expenseshower = () => {
  
  const theme = useSelector((state) => state.Theme.curstate);
  const [amount, setpremiumamount] = useState(0);
  const [per, setper] = useState(false);
  let  [uid,setuid] = useState(null);
  useEffect(() => {
    setuid(auth?.currentUser?.uid)
  },[])
    const HandlePdfDownload = ()=>{
    const data = expenseRedux.map((ele) => {
      return {
        SPENT: ele.SPENT,
        Des: ele.Des,
        Selector: ele.Selector,
        date: ele.date,
        time: ele.time,
      };
    });
    return <FileDownloader props={data} />;
  }

  if (amount > 10000 && !per) {
    // toast.alert('You have to buy premium')
    // alert('Do U want to Buy Premium')
    setper(true);
  }
  // if(amount<10000 && per){
  //     setper(false)
  // }
  const Theme = useSelector((state) => state.Theme.curstate);

  const [editid, seteleid] = useState("");
  const Dispatch = useDispatch();
  const expenseRedux = useSelector((state) => state.expense.arr);
  const spentRef = useRef(null);
  const desRef = useRef(null);
  const selectorRef = useRef(null);
  const [expense] = useState();

  const [edit, setedit] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        setuid(null);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  useEffect(() => {
    if (!uid) return;  // 👈 Only call fetchdata when uid exists
    fetchdata();
  }, [uid]);
  async function fetchdata() {
    try {
      const res = await axios.get(
        `https://expensetracker-27a82-default-rtdb.firebaseio.com/expense/${uid}.json`
      );

      const dataArray = Object.entries(res.data).map(([key, value]) => {
        return { id: key, ...value };
      });

      let tempamount = 0; // Change from const to let
      for (let i = 0; i < dataArray.length; i++) {
        tempamount += parseInt(dataArray[i].SPENT);
      }
      setpremiumamount(tempamount);

      // setexpense(dataArray)
      // setper(dataArray)

      Dispatch(StoreActions.setexpense2(dataArray));
    } catch (err) {
      console.log("err", expenseRedux);
    }
  }
  async function DeleteHandler(ele) {
    // e.preventDefault()
    try {
      await axios.delete(
        `https://expensetracker-27a82-default-rtdb.firebaseio.com/expense/${uid}/${showDelModal.id}.json`
      );
      // const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
      // const dataArray = Object.entries(res2.data).map(([key, value]) => {
      //     return { id: key, ...value };
      // });
      // setexpense(dataArray)
      Dispatch(StoreActions.setdelete(showDelModal));
      setpremiumamount(amount - parseInt(showDelModal?.SPENT));
    } catch {
      console.log("err");
    }
    setShowDelModal(null);
  }
  async function handleexpense(e, e2) {
    e.preventDefault();
    const d = new Date();

    const obj = {
      SPENT: e.target.spent.value,
      Des: e.target.des.value,
      Selector: e.target.selector.value,
      date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
      time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    };

    try {
      const res = await axios.post(
        `https://expensetracker-27a82-default-rtdb.firebaseio.com/expense/${uid}.json`,
        obj
      );
      obj.id = res.data.name;
      Dispatch(StoreActions.setexpense(obj));
      setpremiumamount(amount + parseInt(obj.SPENT));
    } catch (err) {
      console.log(err);
    }
    spentRef.current.value = "";
    desRef.current.value = "";
    selectorRef.current.value = "";
  }

  async function handleedit(ele) {
    Dispatch(StoreActions.setdelete(ele));

    const obj = {
      SPENT: spentRef.current.value,
      Des: desRef.current.value,
      Selector: selectorRef.current.value,
    };
    try {
      await axios.put(
        `https://expensetracker-27a82-default-rtdb.firebaseio.com/expense/${uid}.json`,
        obj
      );

      Dispatch(StoreActions.setexpense({ ...obj, id: ele.id }));
      setpremiumamount(amount - parseInt(ele.SPENT));
      setpremiumamount(amount + parseInt(obj.SPENT));
    } catch (err) {
      console.log(err);
    }
    setedit(false);
  }
  const Editfunc = (ele) => {
    setedit(true);
    spentRef.current.value = ele.SPENT;
    desRef.current.value = ele.Des;
    selectorRef.current.value = ele.Selector;

    seteleid(ele.id);
    // const desValue = desRef.current.value;
    // const selectorValue = selectorRef.current.value;
    // spentValue=ele.SPENT
    // desValue=ele.des
    // selectorValue=ele.selector
  };
  const [showDelModal, setShowDelModal] = useState(null);

  return (
    <div
      className="bg-gray-900 min-h-screen p-4 text-white"
      style={{ backgroundColor: Theme }}
    >
      {showDelModal && (
        <DeleteModal
          setShowDelModal={setShowDelModal}
          DeleteHandler={DeleteHandler}
        />
      )}



      {/* //deepseeek */}
{/* Expense Form */}
<div className={`flex justify-center p-8 ${Theme === 'white' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'} rounded-2xl shadow-xl mb-8 border`}>
  <form className="w-full max-w-5xl" onSubmit={handleexpense}>
    <div className="flex flex-col md:flex-row gap-5 items-end">
      {/* Amount Field */}
      <div className="w-full md:w-auto flex-1">
        <label htmlFor="spent" className={`block text-sm font-medium mb-1 ${Theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
          Amount
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={Theme === 'white' ? 'text-gray-500' : 'text-gray-400'}>₹</span>
          </div>
          <input
            id="spent"
            type="number"
            className={`block w-full pl-10 pr-4 py-3 text-lg rounded-lg border ${Theme === 'white' ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400' : 'border-gray-600 bg-gray-800 text-white placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            ref={spentRef}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Description Field */}
      <div className="w-full md:w-auto flex-1">
        <label htmlFor="des" className={`block text-sm font-medium mb-1 ${Theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
          Description
        </label>
        <input
          id="des"
          type="text"
          className={`block w-full px-4 py-3 text-lg rounded-lg border ${Theme === 'white' ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400' : 'border-gray-600 bg-gray-800 text-white placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          ref={desRef}
          placeholder="Dinner with clients"
        />
      </div>

      {/* Category Selector */}
      <div className="w-full md:w-auto flex-1">
        <label htmlFor="selector" className={`block text-sm font-medium mb-1 ${Theme === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
          Category
        </label>
        <div className="relative">
          <select
            className={`block w-full px-4 py-3 text-lg rounded-lg border ${Theme === 'white' ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-800 text-white'} appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10`}
            ref={selectorRef}
            id="selector"
          >
            <option value="Food">🍔 Food</option>
            <option value="Electricity">💡 Electricity</option>
            <option value="Travel">✈️ Travel</option>
            <option value="Rent">🏠 Rent</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Shopping">🛍️ Shopping</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className={`h-5 w-5 ${Theme === 'white' ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 flex items-center justify-center space-x-2 text-lg"
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Expense</span>
      </button>
    </div>
  </form>
</div>

{/* Total Amount */}
<p className={`text-center text-3xl font-bold mb-4 ${Theme === 'white' ? 'text-teal-600' : 'text-teal-400'}`}>
  Total Amount: <span className={Theme === 'white' ? 'text-teal-700' : 'text-teal-300'}>{amount}</span>
</p>

{/* Expenses Table */}
<div className={`shadow-xl rounded-2xl overflow-hidden border ${Theme === 'white' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
  {/* Table Header */}
  <div className={`grid grid-cols-12 p-4 font-medium ${Theme === 'white' ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-300'}`}>
    <div className="col-span-2 flex items-center">
      <span className="ml-2">Amount</span>
    </div>
    <div className="col-span-3">Description</div>
    <div className="col-span-2">Category</div>
    <div className="col-span-2">Date</div>
    <div className="col-span-1">Time</div>
    <div className="col-span-2 text-right">Actions</div>
  </div>

  {/* Table Body */}
  <div className={`divide-y ${Theme === 'white' ? 'divide-gray-200' : 'divide-gray-700'}`}>
    {expenseRedux.map((ele, index) => (
      <div
        key={ele.id || index}
        className={`grid grid-cols-12 items-center p-4 transition-colors duration-150 ${Theme === 'white' ? 'hover:bg-gray-50' : 'hover:bg-gray-700/50'}`}
      >
        {/* Amount */}
        <div className="col-span-2">
          <span className={`font-bold text-lg ${Theme === 'white' ? 'text-teal-600' : 'text-teal-400'}`}>
            ₹{ele.SPENT}
          </span>
        </div>

        {/* Description */}
        <div className={`col-span-3 truncate ${Theme === 'white' ? 'text-gray-800' : 'text-gray-200'}`}>
          {ele.Des}
        </div>

        {/* Category */}
        <div className="col-span-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${Theme === 'white' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300'}`}>
            {ele?.Selector}
          </span>
        </div>

        {/* Date */}
        <div className={`col-span-2 ${Theme === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>
          {ele?.date}
        </div>

        {/* Time */}
        <div className={`col-span-1 ${Theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
          {ele?.time}
        </div>

        {/* Actions */}
        <div className="col-span-2 flex justify-end space-x-2">
          <button
            onClick={() => Editfunc(ele)}
            className={`p-2 rounded-full transition-colors ${Theme === 'white' ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-100' : 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'}`}
            aria-label="Edit"
          >
            <TiEdit size={20} />
          </button>
          
          <button
            onClick={() => setShowDelModal(ele)}
            className={`p-2 rounded-full transition-colors ${Theme === 'white' ? 'text-red-600 hover:text-red-800 hover:bg-red-100' : 'text-red-400 hover:text-red-300 hover:bg-red-900/30'}`}
            aria-label="Delete"
          >
            <TiDelete size={20} />
          </button>

          {edit && ele.id === editid && (
            <button
              onClick={() => handleedit(ele)}
              className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-sm font-medium rounded-lg shadow hover:shadow-md transition-all"
            >
              Save
            </button>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Empty State */}
  {expenseRedux.length === 0 && (
    <div className={`p-8 text-center ${Theme === 'white' ? 'text-gray-500' : 'text-gray-400'}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-12 w-12 mx-auto ${Theme === 'white' ? 'text-gray-300' : 'text-gray-600'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="mt-2 text-lg">No expenses recorded yet</p>
      <p className="text-sm">Add your first expense to get started</p>
    </div>
  )}
</div>
    </div>
  );
};
export default Expenseshower;
