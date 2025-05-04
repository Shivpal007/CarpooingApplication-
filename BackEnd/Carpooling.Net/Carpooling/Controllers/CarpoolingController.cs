using Carpooling.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Carpooling.Controllers
{
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class CarpoolingController : ControllerBase
    {

        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();

            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    users = con.Users.ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                finally
                {
                    con.Dispose();
                }
            }
            return users;
        }


        [HttpGet]
        public List<Driver> GetDrivers()
        {
            List<Driver> drivers = new List<Driver>();
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    drivers = con.Drivers.Where(d => d.Status == "n").Include(d=>d.UidNavigation).ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
            return drivers;
        }


        [HttpGet]
        public List<Driver> GetAllDrivers()
        {
            List<Driver> drivers = new List<Driver>();
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    drivers = con.Drivers.Include(d => d.UidNavigation).ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
            return drivers;
        }


        [HttpPut("{driverId}")]
        public StatusCodeResult VerifyDriver(int driverId)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    Driver d = con.Drivers.Find(driverId);
                    d.Status = "v";
                    con.SaveChanges();

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return StatusCode(500);
                }
            }
            return StatusCode(200);
        }


        [HttpPut("{driverId}")]
        public StatusCodeResult RejectDriver(int driverId)
        {
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    Driver d = con.Drivers.Find(driverId);
                    d.Status = "r";
                    con.SaveChanges();

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return StatusCode(500);
                }
            }
            return StatusCode(200);
        }



        [HttpGet]
        public List<Ride> GetRides()
        {
            List<Ride> rides = new List<Ride>();
            using (carpoolingContext con = new carpoolingContext())
            {

                try
                {
                    rides = con.Rides.Include(d=>d.Driver.UidNavigation).Include(s=>s.SourceCityNavigation).Include(d=>d.DestinationCityNavigation).ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
            return rides;
        }


        [HttpGet]
        public List<Booking> GetBooking()
        {
            List<Booking> bookings = new List<Booking>();
            using (carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    bookings = con.Bookings.ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
            return bookings;
        }

        [HttpGet]
        public List<City> GetCities() { 
            List<City> cities = new List<City>();
            using(carpoolingContext con = new carpoolingContext())
            {
                try
                {
                    cities = con.Cities.ToList();
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
            return cities;
        }


    }
}
