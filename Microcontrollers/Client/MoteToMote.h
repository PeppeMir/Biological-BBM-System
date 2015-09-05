#ifndef MOTE_TO_MOTE_H
#define MOTE_TO_MOTE_H

typedef nx_struct MoteToMoteMsg
{
	nx_uint16_t nodeID;	
	nx_uint16_t temperature;
	nx_uint16_t humidity;
	nx_uint16_t voltage;
} 
MoteToMoteMsg_t;

enum
{
	AM_RADIO = 6
};

#endif /* MOTE_TO_MOTE_H */
