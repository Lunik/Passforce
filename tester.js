function Tester(password){
	this.password = password
	this.len = password.length
	this.values = {}
}

Tester.prototype.run = function(){
	this.values['NumberOfChar'] = {
		formula: 'X * 4',
		count: this.NumberOfChar()
	}
	this.values['UppercaseLetters'] = {
		formula: `(${this.UppercaseLetters() > 0 ? this.len : 0} - X) * 2`,
		count: this.UppercaseLetters()
	}
	this.values['LowercaseLetters'] = {
		formula: `(${this.LowercaseLetters() > 0 ? this.len : 0} - X) * 2`,
		count: this.LowercaseLetters()
	}
	this.values['Numbers'] = {
		formula: 'X * 4',
		count: this.Numbers()
	}
	this.values['Symbols'] = {
		formula: 'X * 6',
		count: this.Symbols()
	}
	this.values['MiddleNumbersorSymbols'] = {
		formula: 'X * 2',
		count: this.MiddleNumbersorSymbols()
	}
	this.values['Requirements'] = {
		formula: 'X * 2',
		count: this.Requirements()
	}
	this.values['LettersOnly'] = {
		formula: '- X',
		count: this.LettersOnly()
	}
	this.values['NumbersOnly'] = {
		formula: '- X',
		count: this.NumbersOnly()
	}
	this.values['RepeatCharacters'] = {
		formula: '- Math.round(Math.pow(X, 1.1))',
		count: this.RepeatCharacters()
	}
	this.values['ConsecutiveUppercaseLetters'] = {
		formula: '- (X * 2)',
		count: this.ConsecutiveUppercaseLetters()
	}
	this.values['ConsecutiveLowercaseLetters'] = {
		formula: '- (X * 2)',
		count: this.ConsecutiveLowercaseLetters()
	}
	this.values['ConsecutiveNumbers'] = {
		formula: '- (X * 2)',
		count: this.ConsecutiveNumbers()
	}
	this.values['SequentialLetters'] = {
		formula: '- (X * 3)',
		count: this.SequentialLetters()
	}
	this.values['SequentialNumbers'] = {
		formula: '- (X * 3)',
		count: this.SequentialNumbers()
	}
	this.values['SequentialSymbols'] = {
		formula: '- (X * 3)',
		count: this.SequentialSymbols()
	}

	for (var v in this.values){
		this.values[v].value = eval(this.values[v].formula.replace('X', this.values[v].count))
	}

	return this.values
}

Tester.prototype.total = function(){
	var sum = 0
	for (var v in this.values){
		sum += this.values[v]['value']
	}
	return sum
}

/*
	Return the length of the password
*/
Tester.prototype.NumberOfChar = function(){
	return this.password
				.length
}

/*
	Return the numbers of Uppercase Letters
*/
Tester.prototype.UppercaseLetters = function(){
	return this.password
				.replace(/[^A-Z]*/g, '')
				.length
}

/*
	Return the numbers of Lowercase Letters
*/
Tester.prototype.LowercaseLetters = function(){
	return this.password
				.replace(/[^a-z]*/g, '')
				.length
}

/*
	Return the number of Numbers
*/
Tester.prototype.Numbers = function(){
	return this.password
				.replace(/[^0-9]*/g, '')
				.length
}

/*
	Return the number of Symbols
*/
Tester.prototype.Symbols = function(){
	return this.password
				.replace(/[0-9a-zA-Z ]*/g, '')
				.length
}

/*
	Return the number of Numbers or Characters in the middle of the password
*/
Tester.prototype.MiddleNumbersorSymbols = function(){
	return this.password
				.slice(1, this.password.length-1)
				.replace(/[a-zA-Z ]/g, '')
				.length
}

/*
	Return the number of Requirements that are respected
*/
Tester.prototype.Requirements = function(){
	return (this.len >= 8)
		+ (this.UppercaseLetters() > 0)
		+ (this.LowercaseLetters() > 0)
		+ (this.Numbers() > 0)
		+ (this.Symbols() > 0)
		== 5 ? 5 : 0
}

/*
	Return the length of the password if it only contain Letters
*/
Tester.prototype.LettersOnly = function(){
	if (this.len == this.password.replace(/[0-9]*/g, '').length){
		return this.len
	}
	return 0
}

/*
	Return the length of the password if it only contain Numbers
*/
Tester.prototype.NumbersOnly = function(){
	if (this.len == this.password.replace(/[^0-9]*/g, '').length){
		return this.len
	}
	return 0
}

/*
	Return a numbers if a Characters is repeated in a password
*/
Tester.prototype.RepeatCharacters = function(){
	var count = {}
	for (var l in this.password){
		var letter = this.password[l]
		if(typeof(count[letter]) == 'undefined'){
			count[letter] = {
				count: 0,
				coef: 1,
				value: 0
			}
		}
		count[letter].count ++

		var temp_coef = 0
		for (var k = parseInt(l)+1; k < this.len; k++){
			if (this.password[k] == letter){
				temp_coef ++
			} else {
				break
			}
		}
		count[letter].coef += temp_coef
	}
	for (var c in count){
		count[c].value = (count[c].count * (count[c].count / this.len)) * Math.pow(count[c].coef, 2)
	}

	var res = 0
	for (var c in count){
		res += count[c].value
	}

	return Math.round(res)
}

/*
	Return the number of Consecutive Uppercase Letters (more than 3)
*/
Tester.prototype.ConsecutiveUppercaseLetters = function(){
	var matches = this.password.match(/[A-Z]+/g)
	var sum = 0
	for (var m in matches){
		if(matches[m].length > 1){
			sum += matches[m].length
		}
	}
	return sum
}

/*
	Return the number of Consecutive Lowercase Letters
*/
Tester.prototype.ConsecutiveLowercaseLetters = function(){
	var matches = this.password.match(/[a-z]+/g)
	var sum = 0
	for (var m in matches){
		if(matches[m].length > 1){
			sum += matches[m].length
		}
	}
	return sum
}

/*
	Return the number of Consecutive Numbers
*/
Tester.prototype.ConsecutiveNumbers = function(){
	var matches = this.password.match(/[0-9]+/g)
	var sum = 0
	for (var m in matches){
		if(matches[m].length > 1){
			sum += matches[m].length
		}
	}
	return sum
}

/*
	Return the number of three Consecutive Letters follow themself
*/
Tester.prototype.SequentialLetters = function(){
	if (this.len < 3){
		return 0
	}
	var sequence = 0
	for (var i = 0; i < this.len - 2; i++){
		if(!isNaN(this.password[i])){
			continue
		}
		if (
			Math.abs(this.password[i].charCodeAt() - this.password[i+1].charCodeAt()) == 1
			&& Math.abs(this.password[i+1].charCodeAt() - this.password[i+2].charCodeAt()) == 1
		){
			sequence++
		}
	}

	return sequence
}

/*
	Return the number of three Consecutive Numbers follow themself
*/
Tester.prototype.SequentialNumbers = function(){
	if (this.len < 3){
		return 0
	}
	var sequence = 0
	for (var i = 0; i < this.len - 2; i++){
		if(isNaN(this.password[i])){
			continue
		}
		if (
			Math.abs(this.password[i].charCodeAt() - this.password[i+1].charCodeAt()) == 1
			&& Math.abs(this.password[i+1].charCodeAt() - this.password[i+2].charCodeAt()) == 1
		){
			sequence++
		}
	}

	return sequence
}

/*
	Return the number of three Consecutive Symbols follow themself
*/
Tester.prototype.SequentialSymbols = function(){
	return 0
}
module.exports = Tester
