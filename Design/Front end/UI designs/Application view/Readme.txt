------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UI Wireframe designs as of 04/05/2023 (designs to be shown for the Kickstarter meeting)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

***	These are the initial wireframe designs and no colour scheme has been added as of yet, these designs are merely for the team
	and client to visualise the basic flow of the app as well as the main features, such that databse schemas, and contracts can
	be drafted, as well as to simplify the UI implementation process.

***   The following is a highlight of the thought process and suggestions of how we intend to use the application:
      
	1. A user will sign up/login to their account. 
	2. The user will be taken to the "university" page where they will be given the option to choose their university. They will then follow
	   a verification process (using regex to check that they are using an instituion email address that matches the university they have
	   chosen, followed by verifying by sent email that the address is valid and functional) which will be finalised and implemented at a later stage.
	3. After verification and selecting a university, the user will be taken to the "edit timetable" page, where they can search for, add and delete
	   modules from their institution which they wish to present in their timetable. As you can see the "+" button on a searched for module is used
	   to add the module to their list of subjects, and the "dustbin" icon will give delete prompts upon click. The 3dots at the top of a module will
	   give the user options to edit their timetable slots for that subject, and by taking this option the user will be taken to the "edit timeslots" page.
	4. In the "edit timeslot" page a user will be presented with all the available activities for that module and required to select one timeslot
	   for each activity. The modules card will be fitted into the chosen timeslot as it is chosen, such that the user can see how their timetable looks
	   as they build it. If a timeslot for a module has a clash this will be presented to a user as shown in the diagram, such that they may choose another 
	   available timeslot for that module, or select the clashing timeslot (causing the other modules timeslot to disappear) and choose a different timeslot
	   for the other module. Once they are happy with their selections they can exit to the edit timetable page, and take the go back option once again to be
	   presented with the Menu.
	5. The menu provides options such as "update personal information", "edit timetable", "notifiaction preferences" for the user to customise their preferences.
	   This menu will disappear as the user chooses to enter any of the options, or if they simply close it to view their full timetable ("schedule" page).
	6. The "schedule" page is the main timetable where the student can view their modules in a clean, colour coordinated fashion. The module cards present important 
	   information such as the module code, activity, and lecture venue. In this schedule page the user can select the burger icon in the top right to open the menu
         again, or select the bell icon in the top left to see Assignment deadlines and important announcements, regarding tests, exams and changes to assignments.
	7. The "upcoming events page" that pops out after the bell icon is clicked, will show the upcoming assignment deadlines in order of closest to furthest, and
	   below this will be the announcements section, where lecturers can broadcast important information regarding test and exam information, as well as any important
	   changes to assignments such as deadline extensions. Only lecturers will be able to post these assignment details and important announcements, and by adding a module
	   to their timetable a student will automatically subscribe to these event updates. They can choose their notification preferences in the menu.

*** This summarises the initial designs up to this point in time, and further updates or decisions can be added to this readme below the line in future, with the relative details 
    such as date of changes and decisions. ***
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------