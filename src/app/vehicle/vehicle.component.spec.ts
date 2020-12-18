describe('VehicleComponent', () => {
  let customerVehicleData;

  beforeEach(() => {
    customerVehicleData = [
      { customer_name: 'Sahil Arora', vrn: 'HR26AG1111' },
      { customer_name: 'Gunjan', vrn: 'HR26AG0100' },
    ];
  });

  it('increase array length', () => {
   const len =  customerVehicleData.length;

   expect(len).toBe(1);

  });
});
