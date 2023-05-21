import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NotificationList from "../../components/NotificationList";

describe("NotificationList", () => {
  //test that all the titles are rendered
  test("renders correctly", () => {
    const { getByText } = render(<NotificationList />);
    expect(getByText("Announcements")).toBeTruthy();
    expect(getByText("Reminders")).toBeTruthy();
    expect(getByText("Due Dates")).toBeTruthy();
    expect(getByText("Unread")).toBeTruthy();
  });

  //test that the cards are rendered and that they are clickable
  test("expands and collapses Reminders accordion", () => {
    const { getByText } = render(<NotificationList />);
    fireEvent.press(getByText("Reminders")); //press the reminders accordion
    expect(
        getByText("COS 301: Lecture venue changed from North Hall to IT 2-27")
    ).toBeTruthy();
    fireEvent.press(getByText("Reminders"));
    expect(() =>
        getByText("COS 301: Lecture venue changed from North Hall to IT 2-27")
    ).toThrow();
  });

  //test that the cards are rendered and that they are clickable
  test("expands and collapses Due Dates accordion", () => {
    const { getByText } = render(<NotificationList />);
    fireEvent.press(getByText("Due Dates"));
    expect(getByText("COS216: Assignment due soon")).toBeTruthy();
    fireEvent.press(getByText("Due Dates")); // press the accordion again to collapse it
    expect(() => getByText("COS216: Assignment due soon")).toThrow();
  });

  //test that the cards are rendered and that they are clickable
  it('renders the text "IMY 310" after fireEvent', () => {
    const { getByText } = render(<NotificationList />);
    fireEvent.press(getByText('Unread'));
    expect(getByText('IMY310')).toBeTruthy();
  });
});