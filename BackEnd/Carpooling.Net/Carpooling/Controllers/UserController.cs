using Carpooling.Models;
using Carpooling.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Carpooling.Controllers
{

    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly EmailService _emailService;

        public UserController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpGet]
        public Boolean SendEmail(Dictionary<string, string> request)
        {
            string name = request.ContainsKey("Name") ? request["Name"] : "User";
            string email = request.ContainsKey("Email") ? request["Email"] : string.Empty;
            string msg = request.ContainsKey("Msg") ? request["Msg"] : string.Empty;
            string sub = request.ContainsKey("Sub") ? request["Sub"] : string.Empty;


            if (string.IsNullOrEmpty(email))
            {
                return false;
            }


           _emailService.SendEmail(email, sub, msg);

            return true;
        }


        [HttpPost]
        public User Login([FromBody] Dictionary<string, string> loginData)
        {
            string contactno = loginData["contactno"];
            string password = loginData["password"];
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    
                    User user = con.Users
                                   .FirstOrDefault(u => u.Contactno == contactno && u.Password == password);

                    if (user != null)
                    {
                        return user;
                    }
                    else
                    {
                        Console.WriteLine("Invalid contact number or password.");
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return null; 
                }   
            }
        }


        [HttpPost]
        public User Register(User user)
        {
            Console.WriteLine("Uid " + user.Uid);
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    EntityEntry<User> ee = con.Add(user);
                    User u = ee.Entity;
                    con.SaveChanges();
                    Console.WriteLine(u.ToString());
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
            }

            return user;
        }

        [HttpGet]
        public List<Ride> GetRides(int source, int desti, DateTime date)
        {
            List<Ride> ride = new List<Ride>();
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    ride = con.Rides.Include(r => r.DestinationCityNavigation).Include(r => r.SourceCityNavigation).Include(e => e.Driver.UidNavigation).Where(r => r.SourceCity == source && r.DestinationCity == desti && r.Status == "a" && r.Ridedate >= date).ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
            return ride;
        }

        [HttpPost]
        public Driver RegDriver(Driver driver)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    con.Drivers.Add(driver);
                    con.SaveChanges();

                    Driver dnew = con.Drivers.Where(d=>d.DrivingLicence==driver.DrivingLicence).Include(d=>d.UidNavigation).First();
                    if (dnew != null && dnew.UidNavigation != null)
                    {
                        Dictionary<string, string> data = new Dictionary<string, string>();
                        data.Add("Email", dnew.UidNavigation.Email);
                        data.Add("Name", dnew.UidNavigation.Name);
                        data.Add("Msg", $@"
                                <html>
                                <head>
                                    <style>
                                        body {{ font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; }}
                                        .container {{ max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #ccc; }}
                                        h2 {{ color: #333; text-align: center; }}
                                        p {{ color: #555; }}
                                        .footer {{ margin-top: 20px; font-size: 12px; color: #777; text-align: center; }}
                                    </style>
                                </head>
                                <body>
                                    <div class='container'>
                                        <h2>Welcome to Our Ride-Sharing Platform!</h2>
                                        <p>Dear <strong>{dnew.UidNavigation.Name}</strong>,</p>
                                        <p>Thank you for registering as a driver on our platform. We appreciate your willingness to offer rides and help make commuting easier for everyone.</p>
                                        <p>We hope you enjoy your rides and have a great experience with us!</p>
                                        <p>If you have any questions, feel free to reach out to our support team.</p>
                                        <p>Safe travels!</p>
                                        <br>
                                        <p>Best Regards,<br><strong>Ride-Sharing Team</strong></p>
                                        <div class='footer'>
                                            <p>&copy; 2025 Ride-Sharing Platform. All rights reserved.</p>
                                        </div>
                                    </div>
                                </body>
                                </html>");

                        data.Add("Sub", "Driver Registration Confirmation");
                        SendEmail(data);

                    }
                    else
                    {
                        Console.WriteLine("Driver not found or UidNavigation is null.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
            }
            return driver;
        }


        [HttpPost]
        public Ride PublishRide(Ride ride)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    con.Rides.Add(ride);
                    con.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
            }
            return ride;
        }



        [HttpPost]
        public IActionResult CheckBooking(Booking book)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {

                    Booking b = con.Bookings
                        .Where(x => x.RideId == book.RideId && x.Uid == book.Uid)
                        .FirstOrDefault();

                    if (b != null)
                    {
                        return StatusCode(409, new { Message = "Booking already exists" });
                    }
                    
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());

                }
            }
            return StatusCode(200, new { Message = "Booking Not found" });
        }



        [HttpPost]
        public IActionResult BookRide(Booking book)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {

                    Booking b = con.Bookings
                        .Where(x => x.RideId == book.RideId && x.Uid == book.Uid)
                        .FirstOrDefault();

                    if (b != null)
                    {
                        return StatusCode(409, new { Message = "Booking already exists" });
                    }


                    con.Bookings.Add(book);
                    con.SaveChanges();

                    Booking bnew = con.Bookings
                        .Where(x => x.RideId == book.RideId && x.Uid == book.Uid)
                        .FirstOrDefault();

                    if (bnew == null)
                    {
                        return StatusCode(500, new { Message = "Error retrieving booking after save" });
                    }

                    Ride ride = con.Rides
                        .Include(x => x.Driver)
                        .Include(s=>s.SourceCityNavigation)
                        .Include(d=>d.DestinationCityNavigation)
                        .Where(r => r.RideId == bnew.RideId)
                        .FirstOrDefault();

                    if (ride == null)
                    {
                        Console.WriteLine("Driver "+ride.ToString()+ride.Driver.ToString());
                        return StatusCode(500, new { Message = "Ride not found" });
                    }

                    if (ride.Driver == null)
                    {
                        return StatusCode(500, new { Message = "Driver not assigned to ride" });
                    }

                    User driver = con.Users
                        .Where(d => d.Uid == ride.Driver.Uid)
                        .FirstOrDefault();

                    if (driver == null)
                    {
                        return StatusCode(500, new { Message = "Driver details not found" });
                    }

                    User passenger = con.Users
                        .Where(p => p.Uid == book.Uid)
                        .FirstOrDefault();

                    if (passenger == null)
                    {
                        return StatusCode(500, new { Message = "Passenger details not found" });
                    }

                    Dictionary<string, string> data = new Dictionary<string, string>();

                    data.Add("Email", driver.Email);
                    data.Add("Name", driver.Name);
                    data.Add("Msg", $@"
                            <html>
                                <head>
                                    <style>
                                        body {{
                                            font-family: Arial, sans-serif;
                                            background-color: #f4f4f4;
                                            padding: 20px;
                                        }}
                                        .container {{
                                            max-width: 600px;
                                            margin: 0 auto;
                                            background: #ffffff;
                                            padding: 20px;
                                            border-radius: 8px;
                                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                        }}
                                        h2 {{
                                            color: #2C3E50;
                                            text-align: center;
                                            background-color: #007bff;
                                            padding: 10px;
                                            border-radius: 5px;
                                            color: white;
                                        }}
                                        h3 {{
                                            color: #E67E22;
                                            margin-top: 20px;
                                            border-bottom: 2px solid #E67E22;
                                            padding-bottom: 5px;
                                        }}
                                        p {{
                                            font-size: 16px;
                                            line-height: 1.5;
                                            color: #34495E;
                                        }}
                                        .details {{
                                            font-weight: bold;
                                            color: #E74C3C;
                                        }}
                                        .ride-info {{
                                            background-color: #ECF0F1;
                                            padding: 15px;
                                            border-radius: 5px;
                                            margin: 10px 0;
                                        }}
                                        .footer {{
                                            margin-top: 20px;
                                            font-size: 12px;
                                            color: #888;
                                            text-align: center;
                                        }}
                                    </style>
                                </head>
                                <body>
                                    <div class='container'>
                                        <h2>New Ride Booking Notification</h2>
                                        <p>Dear <b>{driver.Name}</b>,</p>
                                        <p>You have a new ride booking for your scheduled ride. Below are the details:</p>

                                        <div class='ride-info'>
                                            <p><strong>🛣 From:</strong> {ride.SourceCityNavigation.Cityname}</p>
                                            <p><strong>📍 To:</strong> {ride.DestinationCityNavigation.Cityname}</p>
                                            <p><strong>📅 Date:</strong> {ride.Ridedate}</p>
                                        </div>

                                        <h3>👤 Passenger Details:</h3>
                                        <p><span class='details'>Name:</span> {passenger.Name}</p>
                                        <p><span class='details'>📞 Contact:</span> {passenger.Contactno}</p>
                                        <p><span class='details'>✉ Email:</span> {passenger.Email}</p>

                                        <p>Thank you for using our ride-sharing service! 🚀</p>

                                        <hr>
                                        <p class='footer'>This is an automated email. Please do not reply.</p>
                                    </div>
                                </body>
                                </html>
                                ");

                    data.Add("Sub", "Booking Notification");

                    // Send Email
                    SendEmail(data);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return StatusCode(500, new { Message = "Internal server error", Error = ex.Message });
                }
            }

            return StatusCode(200, new { Message = "Booking successful" });
        }


        [HttpGet]
        public IActionResult GetDriverInfo(int uid)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    var driver = con.Drivers.FirstOrDefault(x => x.Uid == uid);
                    if (driver != null)
                    {
                     
                        return Ok(new { Message = "Driver found", Driver = driver });
                    }
                    else
                    {
                       
                        return NotFound(new { Message = "Driver not found" });
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                    return StatusCode(500, new { Message = "Internal server error", Error = ex.Message });
                }
            }
        }

        [HttpGet]
        public List<Ride> GetUserRides(int uid)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                var rides = con.Rides
                               .Where(r => r.Driver.Uid == uid && r.Status != "c")
                               .Include(r => r.SourceCityNavigation)
                               .Include(r => r.DestinationCityNavigation)
                               .Include(r => r.Bookings)
                               .ToList();

                return rides;
            }
        }

        [HttpGet]
        public List<Booking> GetUserBookinks(int uid)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                var booking = con.Bookings
                               .Where(r => r.Uid == uid && r.Ride.Status=="a")
                               .Include(i=>i.Ride.SourceCityNavigation)
                               .Include(i => i.Ride.DestinationCityNavigation)
                               .Include(i => i.Ride.Driver.UidNavigation)
                               .ToList();

                return booking;
            }
        }

        [HttpGet]
        public List<Ride> GetUserCompletedRides(int uid)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                var rides = con.Rides
                               .Where(r => r.Driver.Uid == uid && r.Status == "c")
                               .Include(r => r.SourceCityNavigation)
                               .Include(r => r.DestinationCityNavigation)
                               .Include(r => r.Triphistories)
                               .Include(r=>r.Bookings)
                               .ToList();

                return rides;
            }
        }

        [HttpGet]
        public List<Booking> GetUserCompletedBookinks(int uid)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                var booking = con.Bookings
                               .Where(r => r.Uid == uid && r.Ride.Status == "c")
                               .Include(i => i.Ride.SourceCityNavigation)
                               .Include(i => i.Ride.DestinationCityNavigation)
                               .Include(i => i.Triphistories)
                               .ToList();

                return booking;
            }
        }

        //[HttpPut]
        //public StatusCodeResult ProfileUpdate(User profile)
        //{
        //    using (carpoolingContext con = new carpoolingContext())
        //    {
        //        User old = con.Users.Find(profile.Uid); 

        //        if (old == null)
        //        {
        //            return NotFound(); 
        //        }

        //        old.Name = profile.Name;
        //        old.Email = profile.Email;
        //        old.Contactno = profile.Contactno;
        //        old.Address= profile.Address;
        //        old.Dob= profile.Dob;
        //        old.Password = profile.Password;
        //        old.Gender= profile.Gender;
        //        con.SaveChanges(); 

        //        return Ok();
        //    }
        //}
        
        [HttpPost]
        public IActionResult GiveFeedback([FromBody] Triphistory trip)
        {
            if (trip == null)
            {
                return BadRequest("Trip information cannot be null.");
            }

            try
            {
                using (var con = new carpoolingContext())
                {
                    con.Triphistories.Add(trip);
                    con.SaveChanges();

                    Dictionary<string, string> data = new Dictionary<string, string>();


                    Ride ride = con.Rides.Where(r => r.RideId == trip.RideId)
                        .Include(d=>d.Driver)
                        .Include(c=>c.SourceCityNavigation)
                        .Include(c=>c.DestinationCityNavigation)
                        .First();
                    Booking booking = con.Bookings.Where(b => b.BookingId == trip.BookingId).First();

                    User passenger = con.Users.FirstOrDefault(p => p.Uid == booking.Uid);  
                    User driver = con.Users.FirstOrDefault(d => d.Uid == ride.Driver.Uid);

                    data.Add("Email", driver.Email);
                    data.Add("Name", driver.Name);
                    data.Add("Msg", $@"
                                <html>
                                    <head>
                                        <style>
                                            body {{
                                                font-family: Arial, sans-serif;
                                                background-color: #f4f4f4;
                                                padding: 20px;
                                            }}
                                            .container {{
                                                max-width: 600px;
                                                margin: 0 auto;
                                                background: #ffffff;
                                                padding: 20px;
                                                border-radius: 8px;
                                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            }}
                                            h2 {{
                                                color: #2C3E50;
                                                text-align: center;
                                                background-color: #F39C12;
                                                padding: 10px;
                                                border-radius: 5px;
                                                color: white;
                                            }}
                                            p {{
                                                font-size: 16px;
                                                line-height: 1.5;
                                                color: #34495E;
                                            }}
                                            strong {{
                                                color: #E74C3C;
                                            }}
                                            .ride-info {{
                                                background-color: #ECF0F1;
                                                padding: 15px;
                                                border-radius: 5px;
                                                margin: 10px 0;
                                            }}
                                            .footer {{
                                                margin-top: 20px;
                                                font-size: 12px;
                                                color: #888;
                                                text-align: center;
                                            }}
                                        </style>
                                    </head>
                                    <body>
                                        <div class='container'>
                                            <h2>Feedback</h2>
                                            <p><strong>From:</strong> Mr./Mrs. {passenger.Name}</p>
                                            <hr>

                                            <div class='ride-info'>
                                                <p><strong>For your ride:</strong></p>
                                                <p><strong>From:</strong> {ride.SourceCityNavigation.Cityname}</p>
                                                <p><strong>To:</strong> {ride.DestinationCityNavigation.Cityname}</p>
                                                <p><strong>Date:</strong> {ride.Ridedate}</p>
                                            </div>

                                            <p><strong>Rating:</strong> ⭐ {trip.Rating}</p>
                                            <p><strong>Feedback:</strong> 



{trip.Feedback}</p>

                                            <hr>
                                            <p class='footer'>This is an automated email. Please do not reply.</p>
                                        </div>
                                    </body>
                                    </html>
                                    ");

                    data.Add("Sub", "FeedBack from Passenger");
                 
                    SendEmail(data);

                    return Ok(new { message = "Feedback submitted successfully." });
                }
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { message = "Database update failed.", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", error = ex.Message });
            }
        }

    }
}
