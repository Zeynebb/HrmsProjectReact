import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getTimerState from '../../store/actions/TimerStateActions'

const Timer = ({ hoursMinSecs }) => {
    const dispatch = useDispatch()

    const timerState = useSelector(state => state.timerState)

    function sendTimerState(state) {
        dispatch(getTimerState(state))
    }

    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);


    const tick = () => {

        if (hrs === 0 && mins === 0 && secs === 0) {
            sendTimerState(1)//süre dolduğunda => timerState == 1 
            if (timerState === 2) {//yeniden mail gönderme butonuna basıldıysa 
                reset()//süre yeniden başlar
                sendTimerState(3)//timerState == 3 olur
            }
        }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }

    };
    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div>
            {mins > 0 ? //eğer 1 dakikadan fazla süre varsa yeşil renkte görünür
                <p style={{ color: "green", fontSize: "17px", fontWeight: "bold" }}> {`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
                ://eğer 1 dakikadan az süre varsa kırmızı renkte görünür
                <p style={{ color: "red", fontSize: "17px", fontWeight: "bold" }}> {`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
            }
        </div >
    );
}

export default Timer;