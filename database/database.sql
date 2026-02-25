CREATE DATABASE BanquetHallManagement;
USE BanquetHallManagement;

-- USER TABLE
CREATE TABLE User (
    userID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin','Staff','Vendor','Client') NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

INSERT INTO User VALUES

('U003','Jathupriyan','jathup@gmail.com','072588341','hashed_pw_03','Staff','2026-01-10 10:10','2026-01-10 10:10'),
('U004','Kunalan','kunaa2002@gmail.com','0774890043','hashed_pw_04','Vendor','2026-01-10 10:20','2026-01-10 10:20'),
('U005','Piraveena','piya0322@gmail.com','0775645322','hashed_pw_05','Vendor','2026-01-10 10:25','2026-01-10 10:25'),
('U006','Sathu','sathushan@gmail.com','0701297359','hashed_pw_06','Vendor','2026-01-10 10:30','2026-01-10 10:30'),
('U007','Abijan','abijanabi44@gmail.com','0759127355','hashed_pw_07','Client','2026-01-10 10:40','2026-01-10 10:40'),
('U008','Anujan','anukumar1216@gmail.com','0772497108','hashed_pw_08','Client','2026-01-10 10:45','2026-01-10 10:45'),
('U009','Jeenuya','jeenujothy44@gmail.com','0745539641','hashed_pw_09','Client','2026-01-10 10:50','2026-01-10 10:50'),
('U010','Sancika','sancikasathes14@gmail.com','0778673921','hashed_pw_10','Client','2026-01-10 10:55','2026-01-10 10:55');

-- ADMIN TABLE
CREATE TABLE Admin (
    adminID VARCHAR(50) PRIMARY KEY,
    userID VARCHAR(50) UNIQUE,
    privileges VARCHAR(255),
    FOREIGN KEY(userID) REFERENCES User(userID)
);

INSERT INTO Admin VALUES
('A001','U011','Full');

-- STAFF TABLE
CREATE TABLE Staff (
    staffID VARCHAR(50) PRIMARY KEY,
    userID VARCHAR(50) UNIQUE,
    shift VARCHAR(50) NOT NULL,
    adminID VARCHAR(50),
    FOREIGN KEY(userID) REFERENCES User(userID),
    FOREIGN KEY(adminID) REFERENCES Admin(adminID)
);

INSERT INTO Staff VALUES
('S001','U001','Morning','A001'),
('S002','U002','Evening','A001'),
('S003','U003','Full Day','A001');

-- VENDOR TABLE
CREATE TABLE Vendor (
    vendorID VARCHAR(50) PRIMARY KEY,
    userID VARCHAR(50) UNIQUE,
    serviceType VARCHAR(100) NOT NULL,
    adminID VARCHAR(50),
    FOREIGN KEY(userID) REFERENCES User(userID),
    FOREIGN KEY(adminID) REFERENCES Admin(adminID)
);

INSERT INTO Vendor VALUES
('V001','U004','Catering','A001'),
('V002','U005','Decoration','A001'),
('V003','U006','Sound & Lighting','A001');

-- CLIENT TABLE
CREATE TABLE Client (
    clientID VARCHAR(50) PRIMARY KEY,
    userID VARCHAR(50) UNIQUE,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    FOREIGN KEY(userID) REFERENCES User(userID)
);

INSERT INTO Client VALUES
('C001','U007','Main Street','Jaffna'),
('C002','U008','Temple Road','Kilinochchi'),
('C003','U009','Church Lane','Vavuniya'),
('C004','U010','Station Road','Mullaitivu');

-- HALL TABLE (New Table for Normalization)
CREATE TABLE Hall (
    hallID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    pricePerEvent DECIMAL(10,2),
    description TEXT,
    imageURL VARCHAR(255),
    amenities TEXT
);

INSERT INTO Hall VALUES
('H001','Hall 1',500,120000.00,'AC, Stage, Parking, Bar','https://images.unsplash.com/photo-1519671482677-504be0271f95?w=400&h=300&fit=crop', 'Description here'),
('H002','Hall 2',600,120000.00,'AC, Kitchen, Parking, WiFi','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', 'Description here'),
('H003','Hall 3',400,120000.00,'AC, Restrooms, Parking, Flexible','https://images.unsplash.com/photo-1462749823694-69c19ee799fa?w=400&h=300&fit=crop', 'Description here');

-- BOOKING TABLE
CREATE TABLE Booking (
    bookingID VARCHAR(50) PRIMARY KEY,
    totalAmount DECIMAL(10,2) NOT NULL,
    eventDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    bookingStatus ENUM('Pending','Confirmed','Cancelled') DEFAULT 'Pending',
    hallID VARCHAR(50),
    clientID VARCHAR(50),
    FOREIGN KEY(hallID) REFERENCES Hall(hallID),
    FOREIGN KEY(clientID) REFERENCES Client(clientID)
);

INSERT INTO Booking VALUES
('B001',150000.00,'2025-12-10','09:00','17:00','Confirmed','H001','C001'),
('B002',80000.00,'2025-12-15','12:00','18:00','Pending','H002','C002');

-- EVENTCREATEDFROMBOOKING TABLE
CREATE TABLE EventCreatedFromBooking (
    eventID VARCHAR(50) PRIMARY KEY,
    bookingID VARCHAR(50) UNIQUE,
    eventType VARCHAR(50) NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    eventStatus ENUM('Planned','Ongoing','Completed') DEFAULT 'Planned',
    FOREIGN KEY(bookingID) REFERENCES Booking(bookingID)
);

INSERT INTO EventCreatedFromBooking VALUES
('E001','B001','Wedding','09:00','17:00','Planned'),
('E002','B002','Birthday','12:00','18:00','Planned');

-- TASK TABLE
CREATE TABLE Task (
    taskID VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    taskStatus ENUM('Pending','In Progress','Done') DEFAULT 'Pending'
);

INSERT INTO Task VALUES
('T001','Decoration setup','Pending'),
('T002','Catering setup','Pending'),
('T003','Sound & Lighting check','Pending');

-- EVENTHASTASKS TABLE
CREATE TABLE EventHasTasks (
    eventID VARCHAR(50),
    taskID VARCHAR(50),
    completionRemarks VARCHAR(255),
    completedAt DATETIME,
    PRIMARY KEY(eventID, taskID),
    FOREIGN KEY(eventID) REFERENCES EventCreatedFromBooking(eventID),
    FOREIGN KEY(taskID) REFERENCES Task(taskID)
);

INSERT INTO EventHasTasks VALUES
('E001','T001',NULL,NULL),
('E001','T002',NULL,NULL),
('E001','T003',NULL,NULL);

-- EVENTMANAGEDBYSTAFF TABLE
CREATE TABLE EventManagedByStaff (
    staffID VARCHAR(50),
    eventID VARCHAR(50),
    taskID VARCHAR(50),
    assignedAt DATETIME NOT NULL,
    PRIMARY KEY(staffID,eventID,taskID),
    FOREIGN KEY(staffID) REFERENCES Staff(staffID),
    FOREIGN KEY(eventID) REFERENCES EventCreatedFromBooking(eventID),
    FOREIGN KEY(taskID) REFERENCES Task(taskID)
);

INSERT INTO EventManagedByStaff VALUES
('S001','E001','T001','2026-01-10 08:00'),
('S002','E001','T002','2026-01-10 08:10'),
('S003','E001','T003','2026-01-10 08:15');

-- PACKAGE TABLE
CREATE TABLE Package (
    packageID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO Package VALUES
('PCK001','Wedding Package'),
('PCK002','Birthday Package');

-- SERVICE TABLE
CREATE TABLE Service (
    serviceID VARCHAR(50) PRIMARY KEY,
    serviceName VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    basePrice DECIMAL(10,2) NOT NULL,
    availabilityStatus ENUM('Available','Not Available') DEFAULT 'Available',
    vendorID VARCHAR(50),
    adminID VARCHAR(50),
    FOREIGN KEY(vendorID) REFERENCES Vendor(vendorID),
    FOREIGN KEY(adminID) REFERENCES Admin(adminID)
);

INSERT INTO Service VALUES
('SVC001','Catering','Wedding catering',50000.00,'Available','V001','A001'),
('SVC002','Decoration','Wedding decoration',40000.00,'Available','V002','A001'),
('SVC003','Sound & Lighting','Event sound system',30000.00,'Available','V003','A001');

-- PACKAGEINCLUDESSERVICE TABLE
CREATE TABLE PackageIncludesService (
    packageID VARCHAR(50),
    serviceID VARCHAR(50),
    PRIMARY KEY(packageID,serviceID),
    FOREIGN KEY(packageID) REFERENCES Package(packageID),
    FOREIGN KEY(serviceID) REFERENCES Service(serviceID)
);

INSERT INTO PackageIncludesService VALUES
('PCK001','SVC001'),
('PCK001','SVC002'),
('PCK001','SVC003'),
('PCK002','SVC001'),
('PCK002','SVC002');

-- BOOKINGINCLUDESPACKAGE TABLE
CREATE TABLE BookingIncludesPackage (
    bookingID VARCHAR(50),
    packageID VARCHAR(50),
    packagePrice DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(bookingID,packageID),
    FOREIGN KEY(bookingID) REFERENCES Booking(bookingID),
    FOREIGN KEY(packageID) REFERENCES Package(packageID)
);

INSERT INTO BookingIncludesPackage VALUES
('B001','PCK001',120000.00),
('B002','PCK002',75000.00);

-- PAYMENT TABLE
CREATE TABLE Payment (
    paymentID VARCHAR(50) PRIMARY KEY,
    paymentMethod ENUM('Credit Card','Bank Transfer','Cash') NOT NULL,
    paymentStatus ENUM('Paid','Pending','Cancelled') DEFAULT 'Pending',
    amountPaid DECIMAL(10,2) NOT NULL,
    balance DECIMAL(10,2) NOT NULL,
    bookingID VARCHAR(50),
    FOREIGN KEY(bookingID) REFERENCES Booking(bookingID)
);

INSERT INTO Payment VALUES
('P001','Credit Card','Paid',150000.00,0.00,'B001');

-- INVOICE TABLE
CREATE TABLE Invoice (
    invoiceID VARCHAR(50) PRIMARY KEY,
    reason VARCHAR(255) NOT NULL,
    day INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    paymentID VARCHAR(50),
    FOREIGN KEY(paymentID) REFERENCES Payment(paymentID)
);

INSERT INTO Invoice VALUES
('INV001','Booking Payment',10,12,2025,'P001');

-- INVENTORY TABLE
CREATE TABLE Inventory (
    itemID VARCHAR(50) PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    threshold INT NOT NULL,
    lastUpdated DATETIME NOT NULL
);

INSERT INTO Inventory VALUES
('INV001','Chairs','Furniture',200,50,'2026-01-10 09:00'),
('INV002','Tables','Furniture',50,10,'2026-01-10 09:05'),
('INV003','Speakers','Electronics',20,5,'2026-01-10 09:10'),
('INV004','Lights','Electronics',30,5,'2026-01-10 09:15');

-- EVENTUSESINVENTORYITEMS TABLE
CREATE TABLE EventUsesInventoryItems (
    eventID VARCHAR(50),
    itemID VARCHAR(50),
    usedQuantity INT NOT NULL,
    returnedQuantity INT DEFAULT 0,
    PRIMARY KEY(eventID,itemID),
    FOREIGN KEY(eventID) REFERENCES EventCreatedFromBooking(eventID),
    FOREIGN KEY(itemID) REFERENCES Inventory(itemID)
);

INSERT INTO EventUsesInventoryItems VALUES
('E001','INV001',150,0),
('E001','INV002',40,0),
('E001','INV003',10,0),
('E001','INV004',20,0);

-- FEEDBACK TABLE
CREATE TABLE Feedback (
    feedbackID VARCHAR(50) PRIMARY KEY,
    rating INT NOT NULL,
    comments VARCHAR(255),
    clientID VARCHAR(50),
    eventID VARCHAR(50),
    createdAt DATETIME NOT NULL,
    FOREIGN KEY(clientID) REFERENCES Client(clientID),
    FOREIGN KEY(eventID) REFERENCES EventCreatedFromBooking(eventID)
);

INSERT INTO Feedback VALUES
('F001',5,'Excellent service','C001','E001','2025-12-11 10:00'),
('F002',4,'Good, but lighting could improve','C002','E002','2025-12-16 11:00');

-- NOTIFICATION TABLE
CREATE TABLE Notification (
    notificationID VARCHAR(50) PRIMARY KEY,
    recipientEmail VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message VARCHAR(255) NOT NULL,
    userID VARCHAR(50),
    sentAt DATETIME NOT NULL,
    FOREIGN KEY(userID) REFERENCES User(userID)
);

INSERT INTO Notification VALUES
('N001','abijanabi44@gmail.com','Booking Confirmed','Your booking B001 is confirmed','U007','2025-12-05 09:00'),
('N002','kunaa2002@gmail.com','Service Assigned','You are assigned to Catering service for E001','U004','2025-12-06 08:00');

-- REPORT TABLE
CREATE TABLE Report (
    reportID VARCHAR(50) PRIMARY KEY,
    reportType VARCHAR(50) NOT NULL,
    generatedDate DATE NOT NULL,
    adminID VARCHAR(50),
    FOREIGN KEY(adminID) REFERENCES Admin(adminID)
);

INSERT INTO Report VALUES
('R001','Monthly Revenue','2025-12-31','A001'),
('R002','Event Summary','2025-12-31','A001');

-- BOOKINGINCLUDEDINREPORT TABLE
CREATE TABLE BookingIncludedInReport (
    reportID VARCHAR(50),
    bookingID VARCHAR(50),
    fromDate DATE NOT NULL,
    toDate DATE NOT NULL,
    eventType VARCHAR(50) NOT NULL,
    PRIMARY KEY(reportID,bookingID),
    FOREIGN KEY(reportID) REFERENCES Report(reportID),
    FOREIGN KEY(bookingID) REFERENCES Booking(bookingID)
);

INSERT INTO BookingIncludedInReport VALUES
('R001','B001','2025-12-01','2025-12-31','Wedding'),
('R002','B002','2025-12-01','2025-12-31','Birthday');
