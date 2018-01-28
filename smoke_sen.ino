/* we are usimg the metaloxide sensor MQ2 to detect smoke this sensor can detect presence of smoke,dust,
 carbonmonoxide,LPG,CNG and various other harmfull gases this sensor can be used in various fields to include
 a emergency saftey shutdown of the machine in case of any calamity.*/

#define buzz 10

float gs;
void setup()
{
  Serial.begin(9600);
  PinMode(buzz, OUTPUT);
}
void loop()
{
  Serial.println(gas_sen());
  if (gas_sen() = 1);
  {
    Serial.println("danger");
    digitalWrite(buzz, HIGH);
  }  
  delay(1000);
}
int gas_sen()
{

 float gs=analogRead(A3);
 
  if(sr>45)
  {
  return 1;
  }
  else
  {
  return 0;
  }
}

