import { createRef, useEffect, useState } from 'react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import Scheduler from '@toast-ui/react-calendar';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import * as calendar from '../services/schedules';

const views = {
  day: 'Today',
  week: 'Week',
  month: 'Month'
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let instanceCalendar;

const Calendar = () => {
  const [schedules, setSchedules] = useState([]);
  const [view, setView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState('');
  const refCalendar = createRef();

  useEffect(() => {
    instanceCalendar = refCalendar.current.getInstance();

    const currentDate = instanceCalendar.getDate();
    const monthAndYear = `${
      months[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;

    setCurrentMonth(monthAndYear);

    reloadSchedules();
  }, [refCalendar]);

  const handleView = name => {
    setView(name);
  };

  const handleChangeDates = direction => {
    instanceCalendar[direction]();
  };

  const reloadSchedules = async () => {
    try {
      const {
        data: { getSchedules }
      } = await calendar.getSchedules();

      setSchedules(getSchedules);
    } catch (error) {
      console.error(error);
    }
  };

  const createSchedule = async schedule => {
    try {
      await calendar.addSchedule(schedule);
      reloadSchedules();
    } catch (error) {
      console.error(error);
    }
  };

  const updateSchedule = async ({ schedule, changes }) => {
    try {
      await calendar.updateSchedule(schedule, changes);
      reloadSchedules();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSchedule = async ({ schedule }) => {
    try {
      await calendar.deleteSchedule(schedule);
      reloadSchedules();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menu>
        <Menu.Item onClick={() => handleChangeDates('prev')}>
          <Icon name='chevron left' />
        </Menu.Item>
        <Dropdown text={views[view]} pointing className='link item'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleView('day')}>
              Today
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleView('week')}>
              Week
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleView('month')}>
              Month
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item onClick={() => handleChangeDates('next')}>
          <Icon name='chevron right' />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>{currentMonth}</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Scheduler
        ref={refCalendar}
        usageStatistics={false}
        height='calc(100vh - 150px)'
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        month={{ startDayOfWeek: 0 }}
        schedules={schedules}
        scheduleView
        taskView
        view={view}
        useDetailPopup
        useCreationPopup
        onBeforeCreateSchedule={createSchedule}
        onBeforeUpdateSchedule={updateSchedule}
        onBeforeDeleteSchedule={deleteSchedule}
      />
    </>
  );
};

export default Calendar;
