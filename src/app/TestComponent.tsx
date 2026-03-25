// Simple test to see if anything renders
export default function TestComponent() {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      padding: '50px', 
      color: 'white',
      fontSize: '30px',
      fontWeight: 'bold'
    }}>
      TEST - CAN YOU SEE THIS?
      <div style={{ backgroundColor: 'blue', padding: '20px', marginTop: '20px' }}>
        Second test div
      </div>
    </div>
  );
}
