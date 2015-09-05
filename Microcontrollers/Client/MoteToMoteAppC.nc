configuration MoteToMoteAppC
{
	// Nothing
}

implementation
{
	// Main module
	components MoteToMoteC as App;	
	components MainC;
	components LedsC;
	components new TimerMilliC();
	
	App.Boot -> MainC;
	App.Leds -> LedsC;
	App.Timer -> TimerMilliC; 
	
	components SerialPrintfC;
	
	//Temperature component
 	components new SensirionSht11C() as TempSensor;
 	components new SensirionSht11C() as HumSensor;
 	components new VoltageC() as VoltageSensor;
 	
 	App.TempRead -> TempSensor.Temperature;
 	App.HumRead -> HumSensor.Humidity;
 	App.VoltageRead -> VoltageSensor;
 		
	// Radio communication
	components ActiveMessageC;
	components new AMSenderC(AM_RADIO);
	
	App.Packet -> AMSenderC;
	App.AMPacket -> AMSenderC;
	App.AMSend -> AMSenderC;
	App.AMControl -> ActiveMessageC;
}