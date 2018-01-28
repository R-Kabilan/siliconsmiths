#include <dht.h>//download the DHT11 library and use the following functions
 

 
#define dht_apin A0 // Analog Pin sensor is connected to
 
dht DHT;
 

void setup(){
 
  Serial.begin(9600);
 
 }
 

 
void loop(){ 
 
  
} 

float air_hum()
{
  DHT.read11(A4);
 float ho=DHT.humidity;//reads humidity
 return ho;
}
float air_temp()
{
 DHT.read11(A4);
 float t1=DHT.temperature;//reads temperature
 return t1; 
}

