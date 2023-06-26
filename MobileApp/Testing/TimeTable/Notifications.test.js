import React from 'react';
import { render } from '@testing-library/react-native';
import Notifications from '../../screens/Timetable/Notifications';

describe('Notifications', () => {
    it('renders the NotificationList component', () => {
        const { getByTestId } = render(<Notifications />);
        expect(getByTestId('notificationsList')).toBeTruthy();
    });
});
