const express =  require('express');
const app = express();
// import covid19ImpactEstimator from './estimator'  doesnt work when I try to import i get the below error 
//'SyntaxError: Cannot use import statement outside a module'. even after installing webpack to transpile it to ES2015.
const covid19ImpactEstimator = require('./estimator');
var EasyXml = require('easyxml');
var serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());





const dataArr = [];  // Data from the User Stores in this dataArr Object 

// GET API JSON DEFAULT
app.get('/api/v1/on-covid-19', (req, res) =>{
    const data = dataArr[0];
    //console.log(data);  
    if(typeof data === 'undefined'){
        res.status(404).send('There is no data object');
    }else{
         const result  = covid19ImpactEstimator(data)
         res.send(result);
    }

})

// GET API XML
app.get('/api/v1/on-covid-19/xml', (req, res) =>{
    const data = dataArr[0];      
    if(typeof data === 'undefined'){
        res.status(404).send('There is no data object');
    }else{
         const result  = covid19ImpactEstimator(data)
         console.log(serializer.render(result));
         res.send(serializer.render(result));
    }

})

// POST API endpoint
app.post('/api/v1/on-covid-19', (req,res) =>{
        
    const dataObject = {
        region: {
            name: req.body.name,
            avgAge: req.body.avgAge,
            avgDailyIncomeInUSD: req.body.avgDailyIncomeInUSD,
            avgDailyIncomePopulation: req.body.avgDailyIncomePopulation
        },
        periodType: req.body.periodType,
        timeToElapse: req.body.timeToElapse,
        reportedCases: req.body.reportedCases,
        population: req.body.population,
        totalHospitalBeds: req.body.totalHospitalBeds
    };
    
   
    dataArr.push(dataObject);        
    res.send(dataObject);
});
  
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening on Port ${port} .. `));