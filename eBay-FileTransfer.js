function ebay() {
  url = "https://storage.sandbox.ebay.com/FileTransferService"
//  url = "http://myscellanius.appspot.com/"
  u = UrlFetchApp.fetch(url, {
    method: "POST",
    headers: {
    'Content-Type': 'multipart/related; boundary=MIMEBoundaryurn_uuid_FFAFEBBA9E369E19151224106591181; type="application/xop+xml"; start="<0.urn:uuid:334c72f0-aa1c-11dd-ad8b-0800200c9a66>"; start-info="text/xml"',
    'X-EBAY-SOA-SECURITY-TOKEN': '__AgAAAA**AQAAAA**aAAAAA** security token__', 
    'X-EBAY-API-DETAIL-LEVEL': '0',
    'X-EBAY-SOA-OPERATION-NAME': 'uploadFile',
    'X-EBAY-SOA-OPERATION-FORMAT': 'XML',
    'X-EBAY-SOA-SERVICE-NAME': 'FileTransferService',
    'X-EBAY-SOA-SERVICE-VERSION': '1.0.0'
    },
    escaping: false,
    payload: '--MIMEBoundaryurn_uuid_FFAFEBBA9E369E19151224106591181\r\n\
Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n\
Content-Transfer-Encoding: binary\r\n\
Content-ID: <0.urn:uuid:334c72f0-aa1c-11dd-ad8b-0800200c9a66>\r\n\
\r\n\
<?xml version="1.0" encoding="UTF-8"?><uploadFileRequest \
xmlns="http://www.ebay.com/marketplace/services"><taskReferenceId>50013891531</taskReferenceId><fileReferenceId>\
50014005771</fileReferenceId><fileFormat>zip</fileFormat><fileAttachment><Data><xop:Include xmlns:xop="http://www.w3.org/2004/08/xop/include" \
href="cid:1.urn:uuid:FFAF111111369E19151224106591198"/></Data></fileAttachment></uploadFileRequest>\r\n\
--MIMEBoundaryurn_uuid_FFAFEBBA9E369E19151224106591181\r\n\
Content-Type: application/octet-stream\r\n\
Content-Transfer-Encoding: base64\r\n\
Content-ID: <1.urn:uuid:FFAF111111369E19151224106591198>\r\n\
\r\n'
+ Utilities.base64Encode(Utilities.zip([Utilities.newBlob('<?xml version="1.0" encoding="UTF-8"?>\r\n\
<BulkDataExchangeRequests>\
    <Header>\
        <Version>955</Version>\
        <SiteID>0</SiteID>\
    </Header>\
    <SetShipmentTrackingInfoRequest xmlns="urn:ebay:apis:eBLBaseComponents">\
        <OrderID>__ID__</OrderID>\
        <OrderLineItemID>__id__</OrderLineItemID>\
        <Shipment>\
            <ShippedTime>2008-11-25T12:00:00.000Z</ShippedTime>\
            <ShipmentTrackingDetails>\
                <ShippingCarrierUsed>UPS</ShippingCarrierUsed>\
                <ShipmentTrackingNumber>1Z 999 999 99 9999 999 9</ShipmentTrackingNumber>\
            </ShipmentTrackingDetails>\
        </Shipment>\
    </SetShipmentTrackingInfoRequest>\
    <SetShipmentTrackingInfoRequest xmlns="urn:ebay:apis:eBLBaseComponents">\
        <OrderID>__ID__</OrderID>\
        <OrderLineItemID>__ID__</OrderLineItemID>\
        <Shipment>\
            <ShippedTime>2008-11-25T12:00:00.000Z</ShippedTime>\
            <ShipmentTrackingDetails>\
                <ShippingCarrierUsed>UPS</ShippingCarrierUsed>\
                <ShipmentTrackingNumber>1Z 888 888 88 8888 888 8</ShipmentTrackingNumber>\
            </ShipmentTrackingDetails>\
        </Shipment>\
    </SetShipmentTrackingInfoRequest>\
    <SetShipmentTrackingInfoRequest xmlns="urn:ebay:apis:eBLBaseComponents">\
        <OrderID>__ID__</OrderID>\
        <OrderLineItemID>__ID__</OrderLineItemID>\
        <Shipment>\
            <ShippedTime>2008-11-25T12:00:00.000Z</ShippedTime>\
            <ShipmentTrackingDetails>\
                <ShippingCarrierUsed>UPS</ShippingCarrierUsed>\
                <ShipmentTrackingNumber>1Z 777 777 77 7777 777 7</ShipmentTrackingNumber>\
            </ShipmentTrackingDetails>\
        </Shipment>\
    </SetShipmentTrackingInfoRequest>\
</BulkDataExchangeRequests>'.replace(/ {2,}/g, ''))]).getBytes()) +
'\r\n--MIMEBoundaryurn_uuid_FFAFEBBA9E369E19151224106591181--'
  });
  Logger.log(u.getContentText());
}