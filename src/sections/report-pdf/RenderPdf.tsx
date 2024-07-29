import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 4,
  },
  mainContainer: {
    padding: 15,
    marginTop: 10,
    marginBottom: 4,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  headingPart: {
    textAlign: 'center',
  },
  textUnderline: {
    textDecoration: 'underline',
  },
  font12: {
    fontSize: '12px',
  },
  font16: {
    fontSize: 16,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  letterSpacing: {
    letterSpacing: 0.5,
  },
  userName: {
    textAlign: 'center',
    marginBottom: 15,
  },
  dashedLine: {
    textAlign: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    color: 'gray',
  },
  borderBottomContainer: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    borderBottomColor: 'black',
  },
  borderTopContainer: {
    borderTopWidth: 1,
    borderTopStyle: 'dashed',
    borderTopColor: 'black',
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  table: {
    display: 'flex',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {},
  tableCell: {
    width: '25%',
    fontSize: '12px',
    border: 'none',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: '12px',
  },
});

const generatePageContent = (symbolData: any) => {
  let buyTotal = 0;
  let sellTotal = 0;
  let buyQuantityTotal = 0;
  let sellQuantityTotal = 0;
  let brokrageTotal = 0;

  symbolData.sellPositions?.forEach((sellPosition: any) => {
    brokrageTotal += sellPosition.brokerage;
    sellTotal += sellPosition.totalAmount;
    sellQuantityTotal += sellPosition.quantity;
  });

  symbolData.buyPositions?.forEach((buyPosition: any) => {
    brokrageTotal += buyPosition.brokerage;
    buyTotal += buyPosition.totalAmount;
    buyQuantityTotal += buyPosition.quantity;
  });

  const sellTotalResult =
    (sellTotal - buyTotal) * parseInt(symbolData.tickValue, 10) - brokrageTotal;
  const buyTotalResult =
    (buyTotal - sellTotal) * parseInt(symbolData.tickValue, 10) - brokrageTotal;

  console.log({ sellTotalResult, buyTotalResult, d: symbolData.tickValue });
  return (
    <View key={symbolData.symbol} style={{ marginTop: '30px' }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
        }}
      >
        <Text style={[styles.fontBold]}>
          <Text style={{ fontSize: '12px' }}>
            {symbolData.exchange} : FUTCOM : {symbolData.symbol}
          </Text>
          <Text>{symbolData.date}</Text>
        </Text>
        <Text style={{ fontSize: '12px', color: 'gray', fontWeight: 'bold' }}>
          Clg.Rate: {symbolData.closingRate}
        </Text>
      </View>
      <Text style={{ textAlign: 'center', overflow: 'hidden' }}>
        ----------------------------------------------------------------------------------------------------------------------------------------
      </Text>
      <View
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginTop: '12px',
        }}
      >
        <View style={styles.table}>
          <View
            style={[
              styles.tableRow,
              styles.tableHeader,
              {
                borderBottom: '1px dashed black',
                paddingBottom: '8px',
                textAlign: 'center',
                color: 'gray',
                fontWeight: 'bold',
              },
            ]}
          >
            <View style={styles.tableCell}>
              <Text style={[styles.tableCellHeader]}>Sir</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={[styles.tableCellHeader]}>Sell</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Rate</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Date</Text>
            </View>
          </View>
          {symbolData.sellPositions.map((sell: any, index: number) => (
            <View
              style={[styles.tableRow, { paddingTop: '4px', color: 'gray', fontWeight: 'bold' }]}
              key={index}
            >
              <View style={[styles.tableCell]}>
                <Text
                  style={[
                    {
                      fontWeight: 'light',
                      fontSize: '12px',
                      maxWidth: '40px',
                      textAlign: 'center',
                    },
                  ]}
                >
                  {sell.totalAmount}
                </Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={[styles.font12, { textAlign: 'center' }]}>{sell.quantity}</Text>
              </View>
              <View style={[styles.tableCell, { textAlign: 'center' }]}>
                <Text style={styles.font12}>{sell.rate}</Text>
              </View>
              <View style={[styles.tableCell, { textAlign: 'center' }]}>
                <Text style={styles.font12}>{sell?.settal ? `${sell?.date} K` : sell?.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.table}>
          <View
            style={[
              styles.tableRow,
              styles.tableHeader,
              {
                borderBottom: '1px dashed black',
                paddingBottom: '8px',
                color: 'gray',
                fontWeight: 'bold',
              },
            ]}
          >
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Sir</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Buy</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Rate</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Date</Text>
            </View>
          </View>
          {symbolData.buyPositions.map((sell: any, index: number) => (
            <View
              style={[styles.tableRow, { paddingTop: '4px', color: 'gray', fontWeight: 'bold' }]}
              key={index}
            >
              <View style={[styles.tableCell]}>
                <Text style={styles.font12}>{sell.totalAmount}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={[styles.font12]}>{sell.quantity}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12}>{sell.rate}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12}>{sell?.settal ? `${sell?.date} K` : sell?.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* total table container */}
      <View
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginTop: '12px',
        }}
      >
        <View style={styles.table}>
          <>
            <View
              style={[
                styles.tableRow,
                {
                  paddingTop: '4px',
                  borderTop: '1px dashed black',
                  textAlign: 'right',
                  color: 'gray',
                  fontWeight: 'bold',
                },
              ]}
            >
              {sellTotal > buyTotal ? (
                <View style={[styles.tableCell, styles.font12]}>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>{sellTotal}</Text>
                    <Text>- {buyTotal}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden', width: '100%' }}>-------------</Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>{sellTotal - buyTotal}</Text>
                    <Text>* {symbolData.tickValue}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden' }}>-------------</Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text> {(sellTotal - buyTotal) * symbolData.tickValue}</Text>
                    <Text>- {brokrageTotal}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden' }}>--------------------</Text>
                  <Text>{sellTotalResult}</Text>
                </View>
              ) : (
                <View style={[styles.tableCell]} />
              )}
              <View style={[styles.tableCell]}>
                <Text style={[styles.font12, { textAlign: 'center' }]}>{sellQuantityTotal}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12} />
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12} />
              </View>
            </View>
          </>
        </View>

        <View style={styles.table}>
          <>
            <View
              style={[
                styles.tableRow,
                {
                  paddingTop: '4px',
                  borderTop: '1px dashed black',
                  textAlign: 'right',
                  color: 'gray',
                  fontWeight: 'bold',
                },
              ]}
            >
              {buyTotal > sellTotal ? (
                <View style={[styles.tableCell, styles.font12]}>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>{buyTotal}</Text>
                    <Text>- {sellTotal}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden', width: '100%' }}>-------------</Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>{buyTotal - sellTotal}</Text>
                    <Text>* {symbolData.tickValue}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden' }}>-------------</Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text> {(buyTotal - sellTotal) * symbolData.tickValue}</Text>
                    <Text>- {brokrageTotal}</Text>
                  </View>
                  <Text style={{ overflow: 'hidden' }}>--------------------</Text>
                  <Text>{buyTotalResult}</Text>
                </View>
              ) : (
                <View style={[styles.tableCell]} />
              )}
              <View style={[styles.tableCell]}>
                <Text style={[styles.font12, { textAlign: 'left' }]}>{buyQuantityTotal}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12} />
              </View>
              <View style={[styles.tableCell]}>
                <Text style={styles.font12} />
              </View>
            </View>
          </>
        </View>
      </View>
    </View>
  );
};

function generatePdf(pdfNumber: number, data: any) {
  if (pdfNumber === 1)
    return (
      <Document title="pdf data">
        {data.map((tablePair: any, pageIndex: number) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <View style={styles.mainContainer}>
              <View style={[styles.headingPart]}>
                <Text
                  style={[
                    styles.textUnderline,
                    styles.font12,
                    {
                      marginBottom: '8px',
                      color: 'gray',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  DEMO
                </Text>
                <View>
                  <Text
                    style={[
                      styles.font12,
                      styles.letterSpacing,
                      {
                        textAlign: 'center',
                        color: 'gray',
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    FORWARD TRANSACTION BILL
                  </Text>
                </View>
              </View>

              <Text style={styles.dashedLine}>
                ----------------------------------------------------------------------------------------------------------------------------------------
              </Text>

              <View>
                <Text style={[styles.fontBold, styles.font12, styles.userName]}>{data.userId}</Text>
              </View>
              {tablePair.map((symbolData: any, index: number) => (
                <View key={index}>{generatePageContent(symbolData)}</View>
              ))}
            </View>
          </Page>
        ))}
      </Document>
    );
  if (pdfNumber === 2)
    return (
      <Document title="second pdf">
        <Page size="A4" style={styles.page}>
          <View style={[styles.headingPart]}>
            <Text
              style={[
                styles.font12,
                {
                  paddingBottom: '8px',
                  fontWeight: 'bold',
                  backgroundColor: '#D9E1EF',
                },
              ]}
            >
              DEMO
            </Text>
            <View>
              <Text
                style={[
                  styles.font12,
                  styles.letterSpacing,
                  {
                    textAlign: 'center',
                    fontWeight: 600,
                    backgroundColor: '#D9E1EF',
                  },
                ]}
              >
                Clearing Akada Bill FOR 24/05/2024 (Close Settlement)
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
              flexDirection: 'row',
              paddingTop: '8px',
            }}
          >
            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  styles.tableHeader,
                  {
                    borderTop: '1px solid gray',
                    paddingBottom: '8px',
                    paddingTop: '4px',
                    textAlign: 'center',
                    backgroundColor: '#D9E1EF',
                    fontWeight: 'bold',
                  },
                ]}
              >
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellHeader]}>Sir</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellHeader]}>Sel Qty</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Sel Rate</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Date</Text>
                </View>
              </View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    backgroundColor: '#F0F0F0',
                    fontSize: '12px',
                    paddingTop: '4px',
                    color: '#353598',
                    padding: '2px',
                  }}
                >
                  COMEX:FUTCOM:DGCX:31MAY2024, 24.05.24
                </Text>
              </View>

              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    paddingBottom: '4px',
                    border: '0.5px solid black',
                  },
                ]}
              >
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>3887.4400</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={[styles.font12]}>24</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>120.3100</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>24.05 K</Text>
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  styles.tableHeader,
                  {
                    borderTop: '1px solid gray',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingTop: '4px',
                    paddingBottom: '8px',
                    borderLeft: '1px solid gray',
                    backgroundColor: '#D9E1EF',
                  },
                ]}
              >
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Sir</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Buy</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Rate</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellHeader}>Date</Text>
                </View>
              </View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    backgroundColor: '#F0F0F0',
                    fontSize: '12px',
                    color: '#353598',
                    paddingTop: '4px',
                    textAlign: 'right',
                    padding: '2px',
                  }}
                >
                  COMEX:FUTCOM:DGCX:31MAY2024, 24.05.24
                </Text>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    paddingBottom: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    border: '0.5px solid black',
                  },
                ]}
              >
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>3887.4400</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={[styles.font12]}>24</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>120.3100</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>24.05 K</Text>
                </View>
              </View>
            </View>
          </View>

          {/* total table container */}
          <View
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    paddingBottom: '4px',
                  },
                ]}
              >
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>3887.4400</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={[styles.font12]}>24</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12} />
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12} />
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    paddingBottom: '4px',
                  },
                ]}
              >
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12}>3887.4400</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={[styles.font12]}>24</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12} />
                </View>
                <View style={[styles.tableCell]}>
                  <Text style={styles.font12} />
                </View>
              </View>
            </View>
          </View>

          {/* result table container */}
          <View style={{ width: '50%', marginTop: '8px' }}>
            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'right',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    paddingBottom: '4px',
                  },
                ]}
              >
                <View style={[styles.tableCell]}>
                  <View style={styles.font12}>
                    <Text style={{ borderBottom: '1px dashed black' }}>-2878.8000</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottom: '1px dashed black',
                      }}
                    >
                      <Text>8.6400</Text>
                      <Text>(*) 200</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottom: '1px dashed black',
                        gap: '4px',
                      }}
                    >
                      <Text>17.2800</Text>
                      <Text>17.2800</Text>
                    </View>
                    <Text style={{ fontWeight: 600 }}>1436.3136</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* your profit container */}
          <View
            style={{
              fontSize: '12px',
              color: 'red',
              paddingLeft: '20px',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <Text>Your profit (COMEX): 17229.11</Text>
            <Text>Your profit (COMEX): 17229.11</Text>
          </View>

          {/* ledger entry container */}
          <View style={{ marginTop: '6px' }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#D9E1EF',
                textAlign: 'center',
                fontSize: '12px',
                border: '1px solid gray',
                borderBottom: 'none',
              }}
            >
              <Text>Ledger Entry</Text>

              <View
                style={[
                  styles.table,
                  {
                    marginTop: '16px',
                    border: '1px solid gray',
                    borderLeft: 'none',
                    borderRight: 'none',
                  },
                ]}
              >
                <View style={[styles.tableRow, styles.tableCellHeader]}>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text style={{ fontSize: '12px' }}>DBCD</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>VCHNo</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Date</Text>
                  </View>
                  <View
                    style={[styles.tableCell, { borderRight: '1px solid gray', width: '120px' }]}
                  >
                    <Text>Description</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Credit</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Debit</Text>
                  </View>
                  <View style={[styles.tableCell]}>
                    <Text>Balance</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F0F0F0',
                display: 'flex',
                flexDirection: 'column',
                color: '#070783',
                fontSize: '12px',
                paddingBottom: '20px',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                1111111 : GENERAL LEDGER
              </Text>
              <Text style={{ textAlign: 'left' }}>566 : HARIKARA</Text>
            </View>

            {/* tables */}
            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  styles.tableCellHeader,
                  { textAlign: 'center', border: '1px solid gray' },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>18.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>Opening Balance</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]} />
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>11688.86</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>11688.86 Dr</Text>
                </View>
              </View>

              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03501</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00008</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>Stlmt MCX</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]} />
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>3570.0</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03251</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00895</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>807 NA</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>4995.00</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03251</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00895</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>807 NA</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>4995.00</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>

              {/* Total table container */}
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Transaction Total:</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>3570.00</Text>
                </View>
                <View style={[styles.tableCell]} />
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Closing balance:</Text>
                </View>
                <View style={[styles.tableCell, {}]} />
                <View style={[styles.tableCell, {}]}>
                  <Text>6934.16</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>6934.16 Cr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Account Total:</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell]} />
              </View>
            </View>
          </View>

          {/* Commodity table container */}
          <View style={{ marginTop: '6px' }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#D9E1EF',
                textAlign: 'center',
                fontSize: '12px',
                border: '1px solid gray',
                borderBottom: 'none',
                borderTop: 'none',
              }}
            >
              <View
                style={[
                  styles.table,
                  {
                    border: '1px solid gray',
                    borderLeft: 'none',
                    borderRight: 'none',
                  },
                ]}
              >
                <View style={[styles.tableRow, styles.tableCellHeader]}>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text style={{ fontSize: '12px' }}>Commodity</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Contract</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Sell</Text>
                  </View>
                  <View
                    style={[styles.tableCell, { borderRight: '1px solid gray', width: '120px' }]}
                  >
                    <Text>Buy</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Close Rate</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                    <Text>Sell Amount</Text>
                  </View>
                  <View style={[styles.tableCell, { borderRight: '1px solid grays' }]}>
                    <Text>Buy Amount</Text>
                  </View>
                  <View style={[styles.tableCell]} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F0F0F0',
                display: 'flex',
                flexDirection: 'column',
                color: '#070783',
                fontSize: '12px',
                paddingBottom: '8px',
                gap: '4px',
              }}
            >
              <Text style={{ textAlign: 'left' }}>566 : HARIKAKA</Text>
              <Text style={{ textAlign: 'left' }}>COMEX: FUTCOM</Text>
            </View>

            <View style={styles.table}>
              <View
                style={[
                  styles.tableRow,
                  styles.tableCellHeader,
                  { textAlign: 'center', border: '1px solid gray' },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>18.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>Opening Balance</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]} />
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>11688.86</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>11688.86 Dr</Text>
                </View>
              </View>

              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03501</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00008</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>Stlmt MCX</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]} />
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>3570.0</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03251</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00895</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>807 NA</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>4995.00</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                    border: '1px solid gray',
                    borderTop: 'none',
                  },
                ]}
              >
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>03251</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>00895</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>24.05.24</Text>
                </View>
                <View style={[styles.tableCell, { width: '120px', borderRight: '1px solid gray' }]}>
                  <Text>807 NA</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text>4995.00</Text>
                </View>
                <View style={[styles.tableCell, { borderRight: '1px solid gray' }]}>
                  <Text />
                </View>
                <View style={[styles.tableCell]}>
                  <Text>15258.86 Dr</Text>
                </View>
              </View>

              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Transaction Total:</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>3570.00</Text>
                </View>
                <View style={[styles.tableCell]} />
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Closing balance:</Text>
                </View>
                <View style={[styles.tableCell, {}]} />
                <View style={[styles.tableCell, {}]}>
                  <Text>6934.16</Text>
                </View>
                <View style={[styles.tableCell]}>
                  <Text>6934.16 Cr</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell]} />
                <View style={[styles.tableCell, { width: '120px' }]}>
                  <Text>Account Total:</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell, {}]}>
                  <Text>22193.02</Text>
                </View>
                <View style={[styles.tableCell]} />
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

  return null;
}

function renderPdf({ data, pdfNumber }: { data: any; pdfNumber: number }) {
  const groupedTables = [];
  for (let i = 0; i < data.symbol.length; i += 2) {
    groupedTables.push(data.symbol.slice(i, i + 2));
  }

  Font.register({
    src: '/fonts/NotoSans-Italic-VariableFont_wdth,wght.ttf',
    family: 'NotoSans',
  });

  return (
    <Document
      style={{
        width: '100%',
        height: '100vh',
        marginTop: '30px',
      }}
    >
      {generatePdf(pdfNumber, groupedTables)}
    </Document>
  );
}

export function DownloadPdf({ data, pdfNumber }: { data: any; pdfNumber: number }) {
  const groupedTables = [];
  for (let i = 0; i < data.symbol.length; i += 2) {
    groupedTables.push(data.symbol.slice(i, i + 2));
  }

  Font.register({
    src: '/fonts/NotoSans-Italic-VariableFont_wdth,wght.ttf',
    family: 'NotoSans',
  });

  return <>{generatePdf(pdfNumber, groupedTables)}</>;
}

export default renderPdf;
