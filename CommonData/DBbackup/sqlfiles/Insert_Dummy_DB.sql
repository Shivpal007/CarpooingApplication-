use carpooling;

INSERT INTO `user` (`Name`, `Contactno`, `Email`, `gender`, `dob`, `Password`, `Address`) 
VALUES 
('A-Rushikesh Patil', '9313350998', 'rishispatil2002@gmail.com', 'male', '2002-05-24', 'Abc1234', 'abc street, surat, gujarat -100000'),
('A-Omkar Patil','7038171191','ompatil1304@gmail.com','male','2001-04-13','Omkar13045','Shree vihar nigdi behind appughar-411044'),
('A-Siddharth Patil','8830150091', 'sidpatil851@gmail.com','male', '2001-08-26', 'Sid@2001', '202, Tivona Aprtments, Baner'),
('Rahul Deshmukh', '9098765432', 'rahul.deshmukh@gmail.com', 'male', '2001-06-22', 'Rahul@567', '33 Sunrise Apartments, Nagpur, Maharashtra - 440001'),
('Sneha Sharma', '8877665544', 'sneha.sharma@yahoo.com', 'female', '1995-03-15', 'Sneha#789', '45 Green Valley, Pune, Maharashtra - 411001'),
('Aman Verma', '9988776655', 'aman.verma@outlook.com', 'male', '1992-09-12', 'Aman@123', '12 Lake View, Bhopal, Madhya Pradesh - 462001'),
('Priya Singh', '9876543210', 'priya.singh@gmail.com', 'female', '1998-07-20', 'Priya@456', '55 Rosewood Apartments, Jaipur, Rajasthan - 302001'),
('Kunal Thakur', '8765432109', 'kunal.thakur@gmail.com', 'male', '1989-02-10', 'Kunal$321', '8 Palm Grove, Chandigarh - 160001'),
('Anjali Mehta', '9654321098', 'anjali.mehta@gmail.com', 'female', '1993-11-25', 'Anjali!789', '23 Amber Heights, Surat, Gujarat - 395007'),
('Rohit Patil', '8543210987', 'rohit.patil@yahoo.com', 'male', '2000-01-10', 'Rohit%123', '67 Marine Drive, Mumbai, Maharashtra - 400001'),
('Megha Kapoor', '9432109876', 'megha.kapoor@outlook.com', 'female', '1996-05-18', 'Megha*567', '90 Silver Springs, Lucknow, Uttar Pradesh - 226001'),
('Arjun Khanna', '8321098765', 'arjun.khanna@gmail.com', 'male', '1994-08-30', 'Arjun@999', '19 Park Avenue, Hyderabad, Telangana - 500001'),
('Riya Agarwal', '7210987654', 'riya.agarwal@gmail.com', 'female', '1997-10-14', 'Riya@234', '29 Maple Residency, Indore, Madhya Pradesh - 452001'),
('Vikas Yadav', '9109876543', 'vikas.yadav@gmail.com', 'male', '1991-04-22', 'Vikas@567', '44 Sunrise Towers, Delhi - 110001'),
('Pooja Bansal', '8098765432', 'pooja.bansal@gmail.com', 'female', '1990-06-19', 'Pooja@678', '32 Emerald Plaza, Kolkata, West Bengal - 700001'),
('Nikhil Jain', '7987654321', 'nikhil.jain@gmail.com', 'male', '1988-03-12', 'Nikhil@789', '12 Blossom Villa, Bangalore, Karnataka - 560001'),
('Simran Kaur', '6876543210', 'simran.kaur@gmail.com', 'female', '1999-12-01', 'Simran@890', '56 Ocean Heights, Chennai, Tamil Nadu - 600001'),
('Manish Gupta', '5765432109', 'manish.gupta@gmail.com', 'male', '1987-09-09', 'Manish@123', '88 Pearl Residency, Ahmedabad, Gujarat - 380001'),
('Neha Saxena', '4654321098', 'neha.saxena@gmail.com', 'female', '1994-07-21', 'Neha@345', '45 Sunshine Towers, Kanpur, Uttar Pradesh - 208001'),
('Abhishek Malhotra', '3543210987', 'abhishek.malhotra@gmail.com', 'male', '1995-11-15', 'Abhishek@567', '31 Star Apartments, Patna, Bihar - 800001'),
('Isha Rai', '2432109876', 'isha.rai@gmail.com', 'female', '1992-08-25', 'Isha@678', '73 Skyline Plaza, Coimbatore, Tamil Nadu - 641001'),
('Rajesh Kumar', '1321098765', 'rajesh.kumar@gmail.com', 'male', '1990-02-05', 'Rajesh@789', '50 Moonlight Towers, Bhubaneswar, Odisha - 751001'),
('Anita Chauhan', '0210987654', 'anita.chauhan@gmail.com', 'female', '1989-10-29', 'Anita@890', '11 Valley View, Jaipur, Rajasthan - 302002');

UPDATE `user` SET `rid` = '1' WHERE (`uid` = '1');
UPDATE `user` SET `rid` = '1' WHERE (`uid` = '2');
UPDATE `user` SET `rid` = '1' WHERE (`uid` = '3');

INSERT INTO driver (`DrivingLicence`, `UID`, `VehicleInfo`) 
VALUES 
('GJ0520051234567', '1', 'GJ05AA1000 Range Rover'),
('KA0420209876543', '2', 'KA12BD0001 Toyota Innova'),
('DL0320197654321', '3', 'DL01AA0033 Hyundai Creta'),
('GJ0620223456789', '8', 'GJ06NN5555 Ford EcoSport'),
('MH1220151234567', '11', 'MH12DE1234 Maruti Suzuki Swift'),
('KA0420189876543', '20', 'KA03PQ5678 Hyundai i20'),
('DL0520207654321', '13', 'DL05LM4321 Tata Nexon'),
('TN1120193456789', '5', 'TN11GH8765 Mahindra Scorpio');


UPDATE driver SET `status` = 'v' WHERE (`DriverID` = '1');
UPDATE driver SET `status` = 'v' WHERE (`DriverID` = '2');
UPDATE driver SET `status` = 'v' WHERE (`DriverID` = '3');
UPDATE driver SET `status` = 'v' WHERE (`DriverID` = '6');

INSERT INTO ride (`DriverID`, `SourceCity`, `DestinationCity`, `Fare`, `noseat`, `ridedate`,`ridecomplete`) 
VALUES 
('1', '4', '2', '2000', '3', '2024-12-12 10:45:00', '2024-12-12 20:45:00'),
('1', '2', '1', '3000', '4', '2025-01-02 09:30:00','2025-01-02 19:30:00'),
('2', '2', '3', '1000', '5', '2025-01-10 19:30:00', '2025-01-11 00:30:00'),
('7', '2', '4', '700', '2', '2025-01-12 22:45:00', '2025-01-13 05:45:00'),
('1', '2', '4', '500', '4', '2025-01-02 09:30:00','2025-01-02 15:30:00'),
('6', '1', '2', '1000', '5', '2025-01-10 22:30:00', '2025-01-11 05:30:00'),
('6', '1', '2', '8000', '3', '2025-01-20 18:45:00', '2025-01-21 08:45:00');

INSERT INTO booking (`bookingdate`, `RideID`, `UID`) VALUES 
('2024-12-11', '1', '8'),
('2024-12-24', '3', '10'),
('2024-12-09', '1', '2'),
('2024-12-10', '1', '3'),
('2025-01-01', '4', '15'),
('2024-12-29', '6', '11'),
('2024-12-24', '3', '7');

INSERT INTO `payment` (`Amount`, `date`, `BookingID`, `Status`)
VALUES
('2000', '2024-12-13 15:45:00', '1', 's'),
('2000', '2024-12-13 15:45:00', '3', 's'),
('2000', '2024-12-13 15:45:00', '4', 's');

INSERT INTO triphistory (`RideID`,`rating`, `Feedback`) 
VALUES
('1', '8', 'Excellent'),
('1', '2', 'Very Good');
