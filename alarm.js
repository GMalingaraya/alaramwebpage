document.addEventListener("DOMContentLoaded", function() {
    const currentTime = document.querySelector('.time');
    const selectHour = document.getElementById('hour');
    const selectMinute = document.getElementById('minute');
    const selectAmPm = document.getElementById('ampm');
    const setAlarmBtn = document.getElementById('setAlarmBtn');

    let alarmTime, isAlarmSet;
    const ringtone = new Audio('alarm.mp3');

    for (let i = 1; i <= 12; i++) {
        let option = `<option value="${i}">${i}</option>`;
        selectHour.insertAdjacentHTML("beforeend", option);
    }

    for (let i = 0; i <= 59; i++) {
        let paddedValue = i < 10 ? `0${i}` : i;
        let option = `<option value="${paddedValue}">${paddedValue}</option>`;
        selectMinute.insertAdjacentHTML("beforeend", option);
    }

    ['AM', 'PM'].forEach(ampm => {
        let option = `<option value="${ampm}">${ampm}</option>`;
        selectAmPm.insertAdjacentHTML("beforeend", option);
    });

    const updateClock = () => {
        let date = new Date();
        let h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

        if (alarmTime === `${h}:${m} ${ampm}` && isAlarmSet) {
            ringtone.play();
            ringtone.loop = true;
        }
    };

    setInterval(updateClock, 1000);

    function setAlarm() {
        if (isAlarmSet) {
            alarmTime = "";
            ringtone.pause();
            setAlarmBtn.innerText = "Set Alarm";
            isAlarmSet = false;
            return;
        }

        let hour = selectHour.value;
        let minute = selectMinute.value;
        let ampm = selectAmPm.value;

        if (hour === "hour" || minute === "minute" || ampm === "AM/PM") {
            return alert("Please select a valid time to set Alarm!");
        }

        alarmTime = `${hour}:${minute} ${ampm}`;
        isAlarmSet = true;
        setAlarmBtn.innerText = "Clear Alarm";
    }

    setAlarmBtn.addEventListener("click", setAlarm);
});
