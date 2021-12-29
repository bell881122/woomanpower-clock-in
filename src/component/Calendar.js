import React from 'react';
import calendarData from 'src/data/calendarData.json'
import 'src/component/Calendar.scss'
import classNames from 'classnames';
import { display } from '@mui/system';

export default function Calendar() {
    const calendar = calendarData.calendar;
    const years = ["2021", "2022"];
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    const today = new Date().toLocaleString();
    const daysPosition = Math.ceil((new Date() - new Date("2021/12/1").getTime()) / (1000 * 3600 * 24));
    const calendarEl = React.useRef(null);

    React.useEffect(() => {
        const fix = calendarEl.current.clientWidth * 0.45;
        calendarEl.current.style.marginLeft = (-53 * daysPosition + fix) + "px";
        console.log(fix);

    }, [calendarEl, daysPosition]);

    return (
        <div style={{
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden',
            left: 0,
            top: 0,
            position: 'relative',
            display: 'flex'
        }}>
            <div style={{
                position: 'absolute',
                left: 0,
                height:'100%',
                background:'#fff',
            }}>左左</div>
            <div ref={calendarEl} className="calendar">
                {years.map((year, index) =>
                    months.map((month, index) =>
                        (year !== "2021" || (year === "2021" && month === "12月")) &&
                        calendar.map((item, index) =>
                            item.date.indexOf(`/${month.slice(0, -1)}/`) > -1 &&
                            item.date.indexOf(year) > -1 &&
                            <div key={index} className={classNames('calendar-item', today.indexOf(`${item.date} `) > -1 && "active")}>
                                <p>{item.day}</p>
                                <p>{item.date.substring(5)} </p>
                            </div>
                        )
                    ))}
            </div>
            <div style={{
                position: 'absolute',
                right: 0,
                height:'100%',
                background:'#fff',
            }}>右右</div>
        </div>
    );
}

