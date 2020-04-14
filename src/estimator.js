const covid19ImpactEstimator = (data) => {
    //Code goes here
    // Input 
   
   const outputData = {
       // Input Data    
   }
   const estimate = {};
   var severeImpact = {
    "currentlyInfected" : data.reportedCases * 50
   }   //severe Estimate

   var  impact = {
    "currentlyInfected" : data.reportedCases * 10
   }; //Impact Estimate
   

   //Challenge 1
   // var currentlyInfected = data.reportedCases * 10;
    //impact.currentlyInfected = currentlyInfected;

    // var currentlyInfected = data.reportedCases * 50;
    //severImpact.currentlyInfected = currentlyInfected;

   var currentlyInfected = severeImpact.currentlyInfected * (Math.pow(2,12));  
   severeImpact.infectionsByRequestedTime = currentlyInfected;

    currentlyInfected = impact.currentlyInfected * (Math.pow(2,12));
    impact.infectionsByRequestedTime = currentlyInfected;


    // Challenge 2
    //severe
    severeImpact.severCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
    var hospitalBedsRequestedTime =  (data.totalHospitalBeds * 0.35) - severeImpact.severCasesByRequestedTime;
    severeImpact.hospitalBedsRequestedTime = Math.trunc(hospitalBedsRequestedTime);
  //impact
   var severCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
   impact.severCasesByRequestedTime = severCasesByRequestedTime;
   
    hospitalBedsRequestedTime =  (data.totalHospitalBeds * 0.35) - impact.severCasesByRequestedTime;
    impact.hospitalBedsRequestedTime = Math.trunc(hospitalBedsRequestedTime);
    
    //Challenge 3
   // for severe
  var casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTime;

  var casesForVentilatorsByRequestedTime =  severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime =Math.trunc(casesForVentilatorsByRequestedTime);

  //for impact object 
  casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForICUByRequestedTime = casesForICUByRequestedTime;

   casesForVentilatorsByRequestedTime =  impact.infectionsByRequestedTime * 0.02;
   impact.casesForVentilatorsByRequestedTime = Math.trunc(casesForVentilatorsByRequestedTime);

   //for severe
  //var populationIncomePerDay = (data.population * data.region.avgDailyIncomeInUSD)/31;
   var infectedIndividualsIncome = severeImpact.infectionsByRequestedTime * 0.65 * 1.5 * 30;
   severeImpact.dollarsInFlight = infectedIndividualsIncome;

   // for Impact 
   var infectedIndividualsIncome = impact.infectionsByRequestedTime * 0.65 * 1.5 * 30;
   impact.dollarsInFlight = infectedIndividualsIncome;
    
   outputData.data = data;
   estimate.impact = impact;
   estimate.severeImpact = severeImpact;
   outputData.estimate = estimate;


return outputData
};



   //console.log(covid19ImpactEstimator(data));
module.exports = covid19ImpactEstimator; // decided to use CommonJS module.exports
//export default covid19ImpactEstimator;  // for some reason the 'ES6 export default' 

