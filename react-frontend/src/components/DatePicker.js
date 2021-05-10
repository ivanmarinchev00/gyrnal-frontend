import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function DatePick(){
    const [selectedDate, setSelectedDate] = useState(null)
    return(
    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)}/>
    )
}
export default DatePick;