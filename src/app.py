from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'rororor'

# Database Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'adidog'
app.config['MYSQL_DB'] = 'importationform'

mysql = MySQL(app)

@app.route('/')
def dashboard():
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT dv.DonateID, dv.VehicleDescription, dv.CarType, pc.VIN, pc.Color 
        FROM donatedvehicle dv 
        LEFT JOIN passengercar pc ON dv.DonateID = pc.DonateID
    """)
    vehicles = cur.fetchall()
    cur.close()
    return render_template('dashboard.html', vehicles=vehicles)

@app.route('/submit-vehicle', methods=['POST'])
def submit_vehicle():
    app_id   = request.form['ApplicationID']
    dn_id    = request.form['DonateID']
    desc     = request.form['VehicleDescription']
    tariff   = request.form['VehicleTariff']
    origin   = request.form['Origin']
    car_type = request.form['CarType']
    
    vin      = request.form['VIN']
    color    = request.form['Color']
    year     = request.form['YearModel']

    cur = mysql.connection.cursor()
    try:
        cur.execute("""
            INSERT INTO donatedvehicle (DonateID, ApplicationID, VehicleDescription, VehicleTariff, Origin, CarType) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (dn_id, app_id, desc, tariff, origin, car_type))
        
        if car_type == "Passenger Car":
            cur.execute("""
                INSERT INTO passengercar (VIN, DonateID, YearModel, Color) 
                VALUES (%s, %s, %s, %s)
            """, (vin, dn_id, year, color))
            
        mysql.connection.commit()
        flash("Vehicle successfully saved!", "success")
    except Exception as e:
        mysql.connection.rollback()
        flash(f"Database Error: {str(e)}", "danger")
    finally:
        cur.close()
        
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(debug=True)
