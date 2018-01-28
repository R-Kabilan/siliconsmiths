float gs;
void setup()
{
  Serial.begin(9600);
}
void loop()
{
  
  Serial.println(gas_sen());
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

