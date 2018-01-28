const int trigPin = 8;

const int echoPin = 12;

const int l = 2;
const int GND = 5;

void setup() {

Serial.begin(9600);
pinMode(GND, OUTPUT);
digitalWrite(GND, LOW);
}

void loop()

{

long duration, centimeters;


pinMode(trigPin, OUTPUT);

digitalWrite(trigPin, LOW);

delayMicroseconds(2);

digitalWrite(trigPin, HIGH);

delayMicroseconds(10);

digitalWrite(trigPin, LOW);

pinMode(echoPin, INPUT);

duration = pulseIn(echoPin, HIGH);

centimeters = microsecondsTocentimeters(duration);

pinMode(l, OUTPUT);
if ( centimeters <= 10){
digitalWrite(l, HIGH);
delay(5000);}
else{
digitalWrite(l, LOW);
delay(10);
}

Serial.print(centimeters);

Serial.print("cm");


Serial.println();

delay(500);

}

long microsecondsTocentimeters(long microseconds)

{return microseconds / 74 / 2 * 2.5;

}
