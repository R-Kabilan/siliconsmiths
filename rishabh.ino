

const int echoPin = 2;

void setup() {

Serial.begin(9600);
}

void loop(){
long duration, L;

pinMode(echoPin, INPUT);

duration = pulseIn(echoPin, LOW);

L = analogRead(2);

Serial.print(duration"h");



Serial.print("\n");

delay(500);

}


