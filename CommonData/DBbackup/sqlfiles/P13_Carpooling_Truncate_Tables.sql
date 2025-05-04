use P13_Carpooling;

SET SQL_SAFE_UPDATES = 0;
delete from payment  WHERE 1=1;
ALTER TABLE payment AUTO_INCREMENT = 1;
delete from triphistory  WHERE 1=1;
ALTER TABLE triphistory AUTO_INCREMENT = 1;
delete from booking  WHERE 1=1;
ALTER TABLE booking AUTO_INCREMENT = 1;
delete from ride  WHERE 1=1;
ALTER TABLE ride AUTO_INCREMENT = 1;
delete from driver where 1=1;
ALTER TABLE driver AUTO_INCREMENT = 1;
delete from user  WHERE 1=1;
ALTER TABLE user AUTO_INCREMENT = 1;
SET SQL_SAFE_UPDATES = 1;