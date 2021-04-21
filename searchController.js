// var express           = require('express');
// //var request           = require('request');
// var FileSystem               = require('fs');
// var search = function (req, res) {

//     // var searchResponse ={};
//     FileSystem.readFile('./baOneWay.json', 'utf8', function (err, data) {//utf8 is for encoded file to data;  
//        var searchResponse = JSON.parse(data);
//        var OfferLists        = searchResponse.AirShoppingRS.OffersGroup.AirlineOffers.Offer
//        var flightReference   = searchResponse.AirShoppingRS.DataLists.FlightList.Flight;
//       // var SegmentDetails    = searchResponse.AirShoppingRS.DataLists.FlightSegmentList.FlightSegment;
//        var flightSegment     = searchResponse.AirShoppingRS.DataLists.FlightSegmentList.FlightSegment;
//        var fareGroup         =searchResponse.AirShoppingRS.DataLists.FareList.FareGroup;
     
//        var PCR_list        = searchResponse.AirShoppingRS.DataLists.PriceClassList.PriceClass;
     
//        var FlightSegmentLists={}
//        var SegmentInfo={};
//      //  var FlightSegmentLists={};
//        var flightDisplay  = "<style>p.solid {border-style: solid;}</style>";


//        //segment details 
//        SegmentLength=flightReference.length;
       
//        for (var i = 0; i < SegmentLength; i++) {

//         var SegmentKey = flightSegment[i].attributes.SegmentKey;

//         FlightSegmentLists[SegmentKey] = flightSegment[i];
//      }

// //FlghtKey details and segmentReference
//         var flightRefInfo = {};
//         for(var i=0; i<flightReference.length; i++) {
//         var flightKey            = flightReference[i].attributes.FlightKey;
//         var journey              = flightReference[i].Journey;
//         flightRefInfo[flightKey] = flightReference[i];
//         };

//         //farelistKey and Farebasis code Details
//         var fareListKey = {};
//          for(var q=0; q<fareGroup.length; q++) {
//         var listKey = fareGroup[q].attributes.ListKey;
//         fareListKey[listKey] = fareGroup[q].FareBasisCode.Code;
//       } 
      

//       var priceClassSegmentReference = {};
//       for(var i=0; i<PCR_list.length; i++) {
//         var priceClassID = PCR_list[i].attributes.PriceClassID;  
//         var classOfService  = PCR_list[i].ClassOfService;

//         for(var j=0; j<classOfService.length; j++) {
//           var PCR_SegmentKey  = classOfService[j].attributes.refs;
//         //  var fpriceSegmentKeyRef = PCR_SegmentKey.split(" ");

          
//           var priceSegFareRef =(PCR_SegmentKey.split(" ")[0] != undefined ) ? PCR_SegmentKey.split(" ")[0] : '';
//           var combineKey     = priceClassID+'-'+priceSegFareRef;//PCR_1-FBCODE!
//           priceClassSegmentReference[combineKey] = classOfService[j];
//         }
//       }

//       for(var a=0; a<OfferLists.length; a++) {
//         var offerItem   = OfferLists[a].OfferItem;

//         if(offerItem['attributes'] != undefined){
//             offerItem = [offerItem];
//         } 

//         for(var b=0; b< offerItem.length; b++) {

//           var fareComponent = offerItem[b].FareDetail.FareComponent;

//           if(fareComponent['PriceClassRef'] != undefined){
//               fareComponent = [fareComponent];
//           } 

//           for(e=0; e<fareComponent.length; e++) {

//           var priceClassRef = fareComponent[e].PriceClassRef;
//           var compSegRef    = fareComponent[e].SegmentRefs;
//           var fareCompSegRef   = compSegRef.split(" ");

//             for(var r=0; r< fareCompSegRef.length; r++) {
//               var fareComponentSegmentRef = fareCompSegRef[r];
//               var PCR_FcSegKey  = priceClassRef+'-'+fareComponentSegmentRef;
//                if (priceClassSegmentReference[PCR_FcSegKey] != undefined) {
//                 var seatsAvailblity    = priceClassSegmentReference[PCR_FcSegKey].Code.attributes.SeatsLeft;
//                 var marketingName    = priceClassSegmentReference[PCR_FcSegKey].MarketingName;
                
//                 var fareBasicKey     = (priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[1];
//                 var fare            = fareListKey[fareBasicKey];

//                 var BaggageKey     = ((priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[2]) ? (priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[2] : 'No Baggage' ;
//                 var baggage = '';
//                 // if(BaggageKey != 'No Baggage'){
//                 //    baggage = disclosuresList[BaggageKey][1].Text ;
//                 // }else{
//                 //   baggage = BaggageKey;
//                 // }
//                }
//             }
//           }
//           var service = offerItem[b].Service;
//           if(service['attributes'] != undefined){
//               service = [service];
//           } 

//           for(d=0; d<service.length; d++) {
//             var flightRef = service[d].FlightRefs;
//             var passengerRefs = service[d].PassengerRefs;

//             if (flightRefInfo[flightRef] != undefined) {
//               var segmentReferences =  flightRefInfo[flightRef].SegmentReferences;
//               var segmentRefs = segmentReferences.split(" ");

//               for(var m=0; m<segmentRefs.length; m++) {
//                 var segment = segmentRefs[m];

//                   var departure             = ' ';
//                   var departureDate          = ' ';
//                   var departureTime          = ' ';
//                   var departureAirportName   = ' ';
//                   var arrival                = ' ';
//                   var arrivalDate            = ' ';
//                   var arrivalTime            = ' ';
//                   var arrivalAirportName     = ' ';
//                   var airlineID              = ' ';
//                   var airlineName            = ' ';
//                   var flightNumber           = ' ';
//                   var duration               = ' ';
//                   var TotalPrice                  = ' ';
//                   var Currency            = ' ';
//                   var ResponseId             = ' ';
//                   var aircraftCode           = ' ';
//                   var aircraftName           = ' ';

//                   if (FlightSegmentLists[segment] != undefined) {

//                      departure            = FlightSegmentLists[segment].Departure.AirportCode;
//                      departureDate        = FlightSegmentLists[segment].Departure.Date;
//                      departureTime        = FlightSegmentLists[segment].Departure.Time;
//                      departureAirportName = FlightSegmentLists[segment].Departure.AirportName;
//                      arrival              = FlightSegmentLists[segment].Arrival.AirportCode;
//                      arrivalDate          = FlightSegmentLists[segment].Arrival.Date;
//                      arrivalTime          = FlightSegmentLists[segment].Arrival.Time;
//                      arrivalAirportName   = FlightSegmentLists[segment].Arrival.AirportName;
//                      airlineID            = FlightSegmentLists[segment].MarketingCarrier.AirlineID;
//                      airlineName          = FlightSegmentLists[segment].MarketingCarrier.Name;
//                      flightNumber         = FlightSegmentLists[segment].MarketingCarrier.FlightNumber;
//                      aircraftCode         = FlightSegmentLists[segment].Equipment.AircraftCode;
//                      aircraftName         = FlightSegmentLists[segment].Equipment.Name;
//                      duration             = FlightSegmentLists[segment].FlightDetail.FlightDuration.Value;
//                      TotalPrice                = OfferLists[a].TotalPrice.SimpleCurrencyPrice.content;
//                      Currency          = OfferLists[a].TotalPrice.SimpleCurrencyPrice.attributes.Code;
//                      ResponseID           = searchResponse.AirShoppingRS.ShoppingResponseID.ResponseID;
                    
//               } 
//               if(m== 0 && b == 0 && d==0){

//                 flightDisplay +='<div><p  class="solid" ><p style="color:Green;"><strong > ITINERARY - '+(i + 1)+' \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0Total Price : '+TotalPrice+' (Currency : '+Currency+') \xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0  <small><strong>Response ID : </strong>'+ResponseID+'</small> \xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0   <button class="button" style="background-color: Green;"><a href="#" target="_blank"> Book Now</a></button></strong></p>';
//               }
//               if(b == 0) {
//                flightDisplay += '<div><span><strong>'+departure+'</strong></span><small>('+departureTime+')</small><small>('+departureDate+')</small><strong style="color:Blue;"> -----------'+duration+'-------------> </strong><span><strong>'+arrival+'</strong></span><small>('+arrivalTime+')</small><small>('+arrivalDate+')</small></div>  <div>  <small>'+departureAirportName+'</small> -----------<small>'+airlineID+'</small> || <small>'+airlineName+' / '+aircraftName+'</small> || <small>'+flightNumber+' / '+aircraftCode+'</small>----------> <small>'+arrivalAirportName+'</small> \xa0\xa0 \xa0 || \xa0\xa0 \xa0  <small><strong>Marketing Name : </strong>'+marketingName+'</small> \xa0\xa0 \xa0 || \xa0\xa0  <small><strong>Seats Availablity : </strong>'+seatsAvailblity+'</small>\xa0\xa0|| \xa0\xa0  <small><strong>Fair Basis Code : </strong>'+fare+'</small>|| \xa0\xa0  <small><strong>Baggage : </strong>'+baggage+'</small></div>';
//             //     flightDisplay +='<table><tr>';
//             //    flightDisplay +='<div><td><strong>'+departure+'</strong>('+departureTime+')('+departureDate+')</td><td><strong style="color:Black;"> -----------'+duration+'-------------> </strong></td><td><strong>'+arrival+'</strong>('+arrivalTime+')('+arrivalDate+')</td><td><strong>FareType:</strong>'+marketingName+'</td><td><strong>SeatsAvailability:</strong>'+seatsAvailblity+'</div>'; 
//             //    flightDisplay +='<tr><tr>';
//             //    flightDisplay +='<div><td><small>'+departureAirportName+'</td><td>|'+airlineID+' | '+airlineName+' / '+aircraftName+'/'+airlineID+-+flightNumber+' </td><td>/ '+arrivalAirportName+'</td> </div>'
//             //    flightDisplay +='</tr></table>';
//               }

//               if( b == 0 && m == segmentRefs.length-1){
//                   flightDisplay += '<br><hr border-style: Groove;>'
//               }

//               if(d == service.length-1 && m == segmentRefs.length-1 && b == offerItem.length-1){
//                 flightDisplay += '</div>';
//               }
//             }
//           }
//         }
//       }
//     }
//       res.send(flightDisplay);
         





//     })
// }
// module.exports = { search: search }


var fs= require('fs');

var search = function(req, res) {

    fs.readFile('./multicity.json', 'utf8', function (err, data) {

      var Response = JSON.parse(data);

      var flightReference   = Response.Envelope.Body.AirShoppingRS.DataLists.FlightList.Flight;
      var flightSeg         = Response.Envelope.Body.AirShoppingRS.DataLists.FlightSegmentList.FlightSegment;
      var airShoppingRS     = Response.Envelope.Body.AirShoppingRS;
      var priceClass        = Response.Envelope.Body.AirShoppingRS.DataLists.PriceClassList.PriceClass;
      var fareGroup         = Response.Envelope.Body.AirShoppingRS.DataLists.FareList.FareGroup;
      var disclosures       = Response.Envelope.Body.AirShoppingRS.DataLists.DisclosureList.Disclosures;
      var OriginDestination = Response.Envelope.Body.AirShoppingRS.DataLists.OriginDestinationList.OriginDestination;

      var flightDisplay  ='<div><h2> Your Searches </h2></div>';
          flightDisplay +="<style>p.solid {border-style: solid;}</style>"
          
      //Searches and PaxType
    
      var SearchPlace={};
      var depart={};
      var arrival={};
      var adult=0;
      var child=0;
      var infant=0;
      var paxType= Response.Envelope.Body.AirShoppingRS.DataLists.PassengerList.Passenger;
      for(var i=0;i<paxType.length;i++){
        var passType=paxType[i].PTC
        if(passType=="ADT"){
          adult++;
        }
        else if(passType=="CHD"){
          child++;
        }
        else if(passType=="INF"){
          infant++;
        }
      }
      
      for(var i=0;i<OriginDestination.length;i++){
        var OriginDestinationKey=OriginDestination[i].attributes.OriginDestinationKey;
        SearchPlace[OriginDestinationKey]=OriginDestination[i];
        depart[i]=OriginDestination[i].DepartureCode;
        arrival[i]=OriginDestination[i].ArrivalCode;
        flightDisplay +='<div><p style="color:Green;"><strong > Search - '+(i + 1)+' \xa0\xa0\--'+depart[i]+'----->'+arrival[i]+'\xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0(passengers - Adult-'+adult+'\xa0\xa0 \xa0Child-'+child+'\xa0\xa0 \xa0Infant-'+infant+')</p></div>'
        
       // <p  class="solid" >
      }
      
      

      //Get Flight details
      var flightRefInfo = {};
      for(var i=0; i<flightReference.length; i++) {
        var flightKey             = flightReference[i].attributes.FlightKey;
        var journey               = flightReference[i].Journey;
        flightRefInfo[flightKey]  = flightReference[i];
      } 

      //Get segment with flight details
      var flightSegInfo = {};
      //console.log(flightSeg[0])
      
      for(var j=0; j<flightSeg.length; j++) {
        var SegmentKey            = flightSeg[j].attributes.SegmentKey;
        flightSegInfo[SegmentKey] = flightSeg[j];
      }
``
      // List Key
      var fareListKey = {};   
      for(var q=0; q<fareGroup.length; q++) {
        var listKey          = fareGroup[q].attributes.ListKey;
        fareListKey[listKey] = fareGroup[q].FareBasisCode.Code;
      } 

      // disclosure List
      var disclosuresList = {};   
      if(disclosures['attributes'] != undefined){
        disclosures = [disclosures];
      } 
      for(var dc=0;dc<disclosures.length; dc++) {
        var ListKey               = disclosures[dc].attributes.ListKey;
        disclosuresList[ListKey]  = disclosures[dc].Description;
      }

      //Get Price Class Info
      var priceClassSegmentReference = {};
     
      for(var p=0; p<priceClass.length; p++) {
        var priceClassID    = priceClass[p].attributes.PriceClassID;  
        var classOfService  = priceClass[p].ClassOfService;

         for(var c=0; c<classOfService.length; c++) {
          var priceSegmentKeyRef  = classOfService[c].attributes.refs;
          var fpriceSegmentKeyRef = priceSegmentKeyRef.split(" ");
          var priceSegmentKey     = (priceSegmentKeyRef.split(" ")[0] != undefined ) ? priceSegmentKeyRef.split(" ")[0] : '';
          var PCR_SegKey          = priceClassID+'-'+priceSegmentKey;
          priceClassSegmentReference[PCR_SegKey] = classOfService[c];
        }
      }

      var offer    = airShoppingRS.OffersGroup.AirlineOffers.Offer;
      for(var of=0; of<offer.length; of++) {
        var offerItem   = offer[of].OfferItem;
       
         
        for(var b=0; b< offerItem.length; b++) {

          var fareComponent = offerItem[b].FareDetail.FareComponent;
          
          if(fareComponent['PriceClassRef'] != undefined){
              fareComponent = [fareComponent];
          } 

          for(c=0; c<fareComponent.length; c++) {

          var priceClassRef = fareComponent[c].PriceClassRef;
          var SegmentRef    = fareComponent[c].SegmentRefs;
          var fareCompSegRef   = SegmentRef.split(" ");

            for(var r=0; r< fareCompSegRef.length; r++) {
              var fareComponentSegmentRef = fareCompSegRef[r];
              var PCR_FcSegKey            = priceClassRef+'-'+fareComponentSegmentRef;
               if (priceClassSegmentReference[PCR_FcSegKey] != undefined) {
                  var seatsAvailblity  = priceClassSegmentReference[PCR_FcSegKey].Code.attributes.SeatsLeft;
                  var marketingName    = priceClassSegmentReference[PCR_FcSegKey].MarketingName;
                  
                  var fareBasicKey     = (priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[1];
                  var fare             = fareListKey[fareBasicKey];
                  //console.log((priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[2])
                  var BaggageKey       = ((priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[2]) ? (priceClassSegmentReference[PCR_FcSegKey].attributes.refs).split(" ")[2] : 'No Baggage' ;
                  
                  var baggage = '';
                    if(BaggageKey != 'No Baggage'){
                      baggage = disclosuresList[BaggageKey][1].Text ;
                    }else{
                      baggage = BaggageKey;
                    }
                }
            }
          }

            var service = offerItem[b].Service;
            if(service['attributes'] != undefined){
              service = [service];
          } 
          

           for(d=0; d<service.length; d++) {
            var flightRef     = service[d].FlightRefs;
            var passengerRefs = service[d].PassengerRefs;

             if (flightRefInfo[flightRef] != undefined) {
              var segmentReferences =  flightRefInfo[flightRef].SegmentReferences;
              var segmentRefs       = segmentReferences.split(" ");

         
         
              for(var m=0; m<segmentRefs.length; m++) {
                  var segment = segmentRefs[m];

                  var departureFrom          = ' ';
                  var departureDate          = ' ';
                  var departureTime          = ' ';
                  var departureAirportName   = ' ';
                  var arrivalTo              = ' ';
                  var arrivalDate            = ' ';
                  var arrivalTime            = ' ';
                  var arrivalAirportName     = ' ';
                  var airlineID              = ' ';
                  var airlineName            = ' ';
                  var flightNumber           = ' ';
                  var duration               = ' ';
                  var price                  = ' ';
                  var posCurrency            = ' ';
                  var responseId             = ' ';
                  var aircraftCode           = ' ';
                  var aircraftName           = ' ';
                  var OfferId               = ' ';

                  if (flightSegInfo[segment] != undefined) {

                     departureFrom        = flightSegInfo[segment].Departure.AirportCode;
                     departureDate        = flightSegInfo[segment].Departure.Date;
                     departureTime        = flightSegInfo[segment].Departure.Time;
                     departureAirportName = flightSegInfo[segment].Departure.AirportName;
                     arrivalTo            = flightSegInfo[segment].Arrival.AirportCode;
                     arrivalDate          = flightSegInfo[segment].Arrival.Date;
                     arrivalTime          = flightSegInfo[segment].Arrival.Time;
                     arrivalAirportName   = flightSegInfo[segment].Arrival.AirportName;
                     airlineID            = flightSegInfo[segment].MarketingCarrier.AirlineID;
                     airlineName          = flightSegInfo[segment].MarketingCarrier.Name;
                     flightNumber         = flightSegInfo[segment].MarketingCarrier.FlightNumber;
                     aircraftCode         = flightSegInfo[segment].Equipment.AircraftCode;
                     aircraftName         = flightSegInfo[segment].Equipment.Name;
                     duration             = flightSegInfo[segment].FlightDetail.FlightDuration.Value;
                     price                = offer[a].TotalPrice.SimpleCurrencyPrice.content;
                     posCurrency          = offer[a].TotalPrice.SimpleCurrencyPrice.attributes.Code;
                     responseId           = airShoppingRS.ShoppingResponseID.ResponseID;
                     OfferId              = offer[a].attributes.OfferID;
              } 
                if(m== 0 && b == 0 && d==0){
                  

                  flightDisplay +='<div><p  class="solid" ><p style="color:Green;"><strong > ITINERARY - '+(a + 1)+' \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0------(Total Price : '+price+')\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0(Currency : '+posCurrency+')\xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0  <small><strong>AirItenaryID : </strong>'+OfferId+'</small> \xa0\xa0 \xa0\xa0 \xa0\xa0\xa0\xa0 \xa0\xa0 \xa0\xa0 \xa0\xa0   <button class="button" style="background-color: Green;"><a href="#" target="_blank"> Book Now</a></button></strong></p>';
            } 
                if(b == 0) {
                    if(m==1){
                   
                      flightDisplay+='<div><p style="color:Green;"><strong > Stops - '+(segmentRefs.length-1)+'</p></div>';
                    }
                 
                     flightDisplay += '<div><span><strong>'+departureFrom+'</strong></span><small>('+departureTime+')</small><small>('+departureDate+')</small><strong style="color:Black;"> -----------'+duration+'-------------> </strong><span><strong>'+arrivalTo+'</strong></span><small>('+arrivalTime+')</small><small>('+arrivalDate+')</small></div>  <div>  <small>'+departureAirportName+'</small> -----------<small>'+airlineID+'</small> / <small>'+airlineName+' / '+aircraftName+'</small>       / <small>'+airlineID+-+flightNumber+' / '+aircraftCode+'</small>----------> <small>'+arrivalAirportName+'</small> \xa0\xa0 \xa0\xa0\xa0 \xa0 || \xa0\xa0 \xa0  <small><strong>FareType : </strong>'+marketingName+'</small> \xa0\xa0 \xa0\ || \xa0\xa0  <small><strong>Seats Availablity : </strong>'+seatsAvailblity+'</small>\xa0\xa0|| \xa0\xa0  <small><strong>Fair Basis Code : </strong>'+fare+'</small>|| \xa0\xa0  <small><strong>Baggage : </strong>'+baggage+'</small></div>';
               
                }

                if( b == 0 && m == segmentRefs.length-1){
                    flightDisplay += '<br><hr border-style: Groove;>'
                }

                if(d == service.length-1 && m == segmentRefs.length-1 && b == offerItem.length-1){
                  flightDisplay += '</div>';
                }
              }
            }
          }
        }
      }
        res.send(flightDisplay);
    });
  }


module.exports = {search:search};;


