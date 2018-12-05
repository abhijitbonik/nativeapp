<DatePicker
  value={values.birthdate}
  onChange={(_, dateString) => setFieldValue('birthdate', dateString)}
  name='birthdate'
  style={formStyles.date}
  date={this.state.date}
  mode="date"
  showIcon={false}
  placeholder="Date of Birth of child"
  //placeholderTextColor='red'
  format="DD-MM-YYYY"
  minDate="01-01-2011"
  maxDate="01-01-2013"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  onDateChange={(date) => {this.setState({date: date})}}
/>
