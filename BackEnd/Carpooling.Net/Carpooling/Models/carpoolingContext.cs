using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Carpooling.Models
{
    public partial class carpoolingContext : DbContext
    {
        public carpoolingContext()
        {
        }

        public carpoolingContext(DbContextOptions<carpoolingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Driver> Drivers { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Ride> Rides { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Triphistory> Triphistories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p13_carpooling", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("booking");

                entity.HasIndex(e => e.RideId, "RideID");

                entity.HasIndex(e => e.Uid, "booking_ibfk_2_idx");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.Bookingdate)
                    .HasMaxLength(6)
                    .HasColumnName("bookingdate");

                entity.Property(e => e.RideId).HasColumnName("RideID");

                entity.Property(e => e.Uid).HasColumnName("UID");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.RideId)
                    .HasConstraintName("booking_ibfk_1");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("booking_ibfk_2");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");

                entity.Property(e => e.Cityname)
                    .HasMaxLength(255)
                    .HasColumnName("cityname");
            });

            modelBuilder.Entity<Driver>(entity =>
            {
                entity.ToTable("driver");

                entity.HasIndex(e => e.DrivingLicence, "DrivingLicence")
                    .IsUnique();

                entity.HasIndex(e => e.Uid, "driver_ibfk_1_idx");

                entity.Property(e => e.DriverId).HasColumnName("DriverID");

                entity.Property(e => e.DrivingLicence).HasMaxLength(50);

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .HasColumnName("status")
                    .HasDefaultValueSql("'n'")
                    .IsFixedLength();

                entity.Property(e => e.Uid).HasColumnName("UID");

                entity.Property(e => e.VehicleInfo).HasMaxLength(255);

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Drivers)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("driver_ibfk_1");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payment");

                entity.HasIndex(e => e.BookingId, "BookingID");

                entity.Property(e => e.PaymentId).HasColumnName("PaymentID");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.Date)
                    .HasMaxLength(6)
                    .HasColumnName("date");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .HasDefaultValueSql("'n'")
                    .IsFixedLength();

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("payment_ibfk_1");
            });

            modelBuilder.Entity<Ride>(entity =>
            {
                entity.ToTable("ride");

                entity.HasIndex(e => e.DestinationCity, "ride_cityid_d_idx");

                entity.HasIndex(e => e.SourceCity, "ride_cityid_s_idx");

                entity.HasIndex(e => e.DriverId, "ride_ibfk_1_idx");

                entity.Property(e => e.RideId).HasColumnName("RideID");

                entity.Property(e => e.DriverId).HasColumnName("DriverID");

                entity.Property(e => e.Noseat).HasColumnName("noseat");

                entity.Property(e => e.RideComplete).HasColumnType("datetime");

                entity.Property(e => e.Ridedate)
                    .HasMaxLength(6)
                    .HasColumnName("ridedate");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.DestinationCityNavigation)
                    .WithMany(p => p.RideDestinationCityNavigations)
                    .HasForeignKey(d => d.DestinationCity)
                    .HasConstraintName("ride_cityid_d");

                entity.HasOne(d => d.Driver)
                    .WithMany(p => p.Rides)
                    .HasForeignKey(d => d.DriverId)
                    .HasConstraintName("ride_ibfk_1");

                entity.HasOne(d => d.SourceCityNavigation)
                    .WithMany(p => p.RideSourceCityNavigations)
                    .HasForeignKey(d => d.SourceCity)
                    .HasConstraintName("ride_cityid_s");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname)
                    .HasMaxLength(255)
                    .HasColumnName("rname");
            });

            modelBuilder.Entity<Triphistory>(entity =>
            {
                entity.HasKey(e => e.TripId)
                    .HasName("PRIMARY");

                entity.ToTable("triphistory");

                entity.HasIndex(e => e.RideId, "RideID");

                entity.HasIndex(e => e.BookingId, "booking_fk_idx");

                entity.Property(e => e.TripId).HasColumnName("TripID");

                entity.Property(e => e.Feedback).HasMaxLength(255);

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.RideId).HasColumnName("RideID");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Triphistories)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("booking_fk");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.Triphistories)
                    .HasForeignKey(d => d.RideId)
                    .HasConstraintName("triphistory_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Contactno, "Contactno")
                    .IsUnique();

                entity.HasIndex(e => e.Rid, "rid_fk_idx");

                entity.Property(e => e.Uid).HasColumnName("UID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Dob).HasColumnName("dob");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.Gender)
                    .HasMaxLength(255)
                    .HasColumnName("gender");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.Rid)
                    .HasColumnName("RID")
                    .HasDefaultValueSql("'2'");

                entity.HasOne(d => d.RidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rid_fk");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
