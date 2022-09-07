function createEmployeeRecord(anArray){
    let objs = {
        firstName : anArray[0],
        familyName : anArray[1],
        title : anArray[2],
        payPerHour : anArray[3],
        timeInEvents : [],
        timeOutEvents : []
}
return objs
}


function createEmployeeRecords(Arr){
    let newobj = []
    Arr.forEach( obj => {
      newobj.push(createEmployeeRecord(obj))
     
       });
       return  newobj
}

function createTimeInEvent(emloyeeRecords,dateStamps){
    let separatetimes = dateStamps.split(` `)
    emloyeeRecords.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(separatetimes[1]),
        date : separatetimes[0]
    })
    return emloyeeRecords
}

function createTimeOutEvent(emloyeeRecord,dateStamp){
    let timeinseparate = dateStamp.split(` `)
    emloyeeRecord.timeOutEvents.push({
        type : "TimeOut",
        hour : parseInt(timeinseparate[1]),
        date : timeinseparate[0]
    })
    return emloyeeRecord
}

function hoursWorkedOnDate(employerecords,formdate){
    let walkin = employerecords.timeInEvents.find(element => element.date === formdate);
    let walkout = employerecords.timeOutEvents.find(element => element.date === formdate);
    let final = (walkout.hour - walkin.hour)/100
    return final;
}
function wagesEarnedOnDate(employeerecord,formdate){
    let walkin = employeerecord.timeInEvents.find(element => element.date === formdate);
    let walkut = employeerecord.timeOutEvents.find(element => element.date === formdate);
    let final = ((walkut.hour - walkin.hour)/100)*employeerecord.payPerHour
    return final;
}
function allWagesFor(employerecord){
    let noofdays = employerecord.timeInEvents.length;
    let sum = 0;
    for (let i =0 ; i < noofdays; i ++){
        let totalhrs = (employerecord.timeOutEvents[i].hour - employerecord.timeInEvents[i].hour)/100
        sum = sum + (totalhrs*employerecord.payPerHour)
    }
    return sum;
}

function calculatePayroll(emloyeearrayRecord){

    let sums = 0;
    for (let i =0 ; i < emloyeearrayRecord.length ; i++){
        sums = sums + allWagesFor(emloyeearrayRecord[i])
    }
    return sums;
}