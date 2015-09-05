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
	
	App.Boot -> MainC;
	App.Leds -> LedsC;
	
	components SerialPrintfC;
	
	// Radio communication
	components ActiveMessageC;
	components new AMSenderC(AM_RADIO);
	components new AMReceiverC(AM_RADIO);
	
	App.Packet -> AMSenderC;
	App.AMPacket -> AMSenderC;
	App.AMSend -> AMSenderC;
	App.AMControl -> ActiveMessageC;
	App.Receive -> AMReceiverC;
}