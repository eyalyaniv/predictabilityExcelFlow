Logger = BetterLog.useSpreadsheet('1Zf3sCJkscMAnQFy0nJWlpti4XSv4So14_Nu6KaFvRVE'); 


function doPost(demoReportData) {
  var sheets = SpreadsheetApp.openById('1qafe-NXc0n4kzkIeDsPziFcv2toEZIrYbqF6_6vekYY');
  var params = demoReportData.parameters;
  
  if(demoReportData){
    try{
      var parsedData = JSON.parse(demoReportData.postData.contents);
     }
     catch(e){
     Logger.log(e.message);
     
     }
      Logger.log("got demo report data: " + parsedData.isTestBot);
      var nextInsertRowNum = getNextInsertRowInReportTab();
      insertDemoReportDataToRow(nextInsertRowNum, parsedData);
  }
  else{
    Logger.log('Error: Post request came in empty...');
  }
}

function doGet(request) {
  //var spr = SpreadsheetApp.getActiveSpreadsheet();
  //var tab = spr.getSheetByName('The Team');
  
  if(request){
   //tab.getRange('B10').setValue(request.parameters);  
  }
  else{
    //tab.getRange('B10').setValue('Request Empty');  
  }
  return true;
}

function insertDemoReportDataToRow(nextInsertRowNum, demoReportData){
    Logger.log("attemping to insert data to row: " + nextInsertRowNum + " ...");
    var spr = SpreadsheetApp.openById('1qafe-NXc0n4kzkIeDsPziFcv2toEZIrYbqF6_6vekYY');
    var tab = spr.getSheetByName('clientDailyDemoReport');
    
    Logger.log("attemping to insert owner: " + demoReportData.owner + " ...");
    tab.getRange('A' + nextInsertRowNum).setValue(demoReportData.owner); 
    
    Logger.log("attemping to insert title: " + demoReportData.title + " ...");
    tab.getRange('B' + nextInsertRowNum).setValue(demoReportData.title);
    
    Logger.log("attemping to insert demoedTo: " + demoReportData.demoedTo + " ...");
    tab.getRange('C' + nextInsertRowNum).setValue(demoReportData.demoedTo);
    
    Logger.log("attemping to insert demoDate: " + demoReportData.demoDate + " ...");
    tab.getRange('D' + nextInsertRowNum).setValue(demoReportData.demoDate);
    
    Logger.log("attemping to insert cardLink: " + demoReportData.cardLink + " ...");
    tab.getRange('E' + nextInsertRowNum).setValue(demoReportData.cardLink);
    
    Logger.log("attemping to insert cardSize: " + demoReportData.cardSize + " ...");
    tab.getRange('F' + nextInsertRowNum).setValue(demoReportData.cardSize);
    
    Logger.log("attemping to insert numOfDemos: " + demoReportData.numOfDemos + " ...");
    tab.getRange('G' + nextInsertRowNum).setValue(demoReportData.numOfDemos);
    
    Logger.log("attemping to insert dueTime: " + demoReportData.dueTime + " ...");
    tab.getRange('H' + nextInsertRowNum).setValue(demoReportData.dueTime);
    
    Logger.log("attemping to insert comment: " + demoReportData.comment + " ...");
    tab.getRange('I' + nextInsertRowNum).setValue(demoReportData.comment);
}

function getNextInsertRowInReportTab() {
  Logger.log("attempting to find insert row in: clientDailyDemoReport");
  var spr = SpreadsheetApp.openById('1qafe-NXc0n4kzkIeDsPziFcv2toEZIrYbqF6_6vekYY');
  Logger.log("got active spreadsheet...");
  try{
      var tab = spr.getSheetByName('clientDailyDemoReport');
  }
  catch(e){
    Logger.log(e.message);
  }
  Logger.log("got tab...");
  var column = tab.getRange('A:A');
  Logger.log("got column...");
  var values = column.getValues();
  Logger.log("got column values...");
  var ct = 0;
  while ( values[ct] && values[ct][0] != "" ) {
    ct++;
  }
  Logger.log("next insert row is: " + (ct+1));
  return (ct+1);
}
