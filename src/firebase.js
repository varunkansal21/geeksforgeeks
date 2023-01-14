import { initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from "firebase/database";

const firebaseConfig = {
  //...
  apiKey: 'AIzaSyD1zbFnurNU4SJg7d6VEaPtD5P43DDrYnA',
  authDomain: 'daily-report-8b1ca.firebaseapp.com',
  projectId: 'daily-report-8b1ca',
  databaseURL: 'https://daily-report-8b1ca-default-rtdb.firebaseio.com/',
  storageBucket: 'daily-report-8b1ca.appspot.com'
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


export function addEmployee(Id, name, date_of_joining, date_of_leaving = "") {
  set(ref(db, 'employee/'+Id),{
    id: Id,
    name: name,
    doj: date_of_joining,
    dol: date_of_leaving
  })
  .then(() => {
    return {
      'status': 'success',
      'msg': 'Data added SuccesFully'
    }
  })
  .catch(() => {
    return {
      'status': 'failure',
      'msg': 'error while adding data'
    }
  })
}

export function getEmployee(Id) {
  const employeeRef = ref(db, 'employee/'+Id);
  onValue(employeeRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    return data;
  })
}

