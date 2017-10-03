export class createEI {

constructor (
public apiKey: string,
public modelName: string,
public calledMethod: string,
public methodProperties: string,
public PayerType: string,
public PaymentMethod: string,
public DateTime: string,
public CargoType: string,
public VolumeGeneral: number,
public Weight: number,
public ServiceType: string,
public SeatsAmount: string,
public Description: string,
public Cost: number,
public CitySender: string,
public Sender: string,
public SenderAddress: string,
public ContactSender: string,
public SenderPhone: number,
public CityRecipient: string,
public Recipient: string,
public RecipientAddress: string,
public ContactRecipient: string,
public RecipientsPhone: number) {}
}
