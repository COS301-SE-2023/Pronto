import React from "react";
import { render } from '@testing-library/react-native';

//import schedule timetable create extensive UI tests

import ScheduleTable from "../../screens/Timetable/ScheduleTable";

describe('ScheduleTable', () => {
    //Test that the UI renders correctly by checking the testID called scheduleTable
    test('should render scheduleTable component', async () => {
        const {getByTestId} = render(<ScheduleTable/>);
        const scheduleTable = getByTestId('scheduleTable');
        expect(scheduleTable).toBeTruthy();
    });


});