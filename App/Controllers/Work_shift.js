const con = require('../db');

// add new Record
exports.Create = (req, res) => {
    con.query("select * from organization where organization_id=" + req.body.organization_id, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.end("Plz Choose Correct Organisation");
        }
        else {
            let sql = "select * from work_shift where start_time='" + req.body.start_time + "'and end_time='" + req.body.end_time + "' and organization_id=" + req.body.organization_id;
            con.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    res.end("Shift Already Exists");
                }
                else {
                    con.query('INSERT INTO work_shift SET ?', req.body, (err, result) => {
                        if (err) throw err;
                        res.send(req.body);
                    });
                }
            })
        }
    })
}

// Get all Records
exports.getAll = (req, res) => {
    con.query("select work_shift_id,work_shift_name,start_time,end_time,shift_start_date,shift_end_date,organization.organization_name from work_shift,organization where organization.organization_id = work_shift.organization_id", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
}

// Get Single Record
exports.getOne = (req, res) => {
    con.query("select work_shift_id,work_shift_name,start_time,end_time,shift_start_date,shift_end_date,organization.organization_name from work_shift,organization where organization.organization_id = work_shift.organization_id and work_shift_id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.end("Record Not Found");
        }
        else{
            res.send(JSON.stringify(result));
        }
    })
}

// Update
exports.Update = (req, res) => {
    con.query("select * from work_shift where work_shift_id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.end("Record Not Found");
        }
        else{
            con.query("select * from organization where organization_id=" + req.body.organization_id, (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    res.end("Plz Choose Correct Organisation");
                }
                else {
                    let sql = "select * from work_shift where start_time='" + req.body.start_time + "'and end_time='" + req.body.end_time + "' and organization_id=" + req.body.organization_id;
                    con.query(sql, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            res.end("Shift Already Exists");
                        }
                        else {
        
                            let sql = "update work_shift set work_shift_name='" + req.body.work_shift_name + "',start_time='" + req.body.start_time + "',shift_start_date='" + req.body.shift_start_date + "',end_time='" + req.body.end_time + "',start_time='" + req.body.start_time + "',shift_end_date='" + req.body.shift_end_date + "',organization_id=" + req.body.organization_id + " where work_shift_id =" + req.params.id;
                            con.query(sql, req.body, (err, result) => {
                                if (err) throw err;
                                res.send(req.body);
                            });
                        }
                    })
                }
            })
        }
    }) 
}

// Delete  
exports.Delete = (req, res) => {
    con.query("select * from work_shift where work_shift_id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.end("Record Not Found");
        }
        else{
            con.query("delete from work_shift where work_shift_id=?", [req.params.id], (err, result) => {
                if (err) throw err;
                res.send("Record Deleted Successfully");
            })
        }
    }) 
}