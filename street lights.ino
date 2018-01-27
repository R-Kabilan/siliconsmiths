#define GND 10
void setup()
{
Serial.begin(9600);
pinMode(5, INPUT);
pinMode(6, INPUT);
pinMode(7, INPUT);
pinMode(8, INPUT);
pinMode(9, INPUT);
pinMode(3, OUTPUT);
pinMode(4, OUTPUT);
pinMode(GND, OUTPUT);
digitalWrite(GND, LOW);
}

void loop()
{
//the code is pgmed to read the digital inputa and work accordingly


}
