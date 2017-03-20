var chalk = require('chalk')

module.exports = function(data){
	var good = `[${chalk.green('+')}]`
	var bad = `[${chalk.red('-')}]`
	return `
	YOUR SCORE: ${colorise(data.total)}
								Score:
	Additions:
		${good} Number of Characters (${data.results['NumberOfChar']['count']}): 			${colorise(data.results['NumberOfChar']['value'])}
		${good} Uppercase Letters (${data.results['UppercaseLetters']['count']}): 			${colorise(data.results['UppercaseLetters']['value'])}
		${good} Lowercase Letters (${data.results['LowercaseLetters']['count']}): 			${colorise(data.results['LowercaseLetters']['value'])}
		${good} Numbers (${data.results['Numbers']['count']}): 				${colorise(data.results['Numbers']['value'])}
		${good} Symbols (${data.results['Symbols']['count']}): 				${colorise(data.results['Symbols']['value'])}
		${good} Middle Numbers or Symbols (${data.results['MiddleNumbersorSymbols']['count']}): 		${colorise(data.results['MiddleNumbersorSymbols']['value'])}
		${good} Requirements (${data.results['Requirements']['count']}): 				${colorise(data.results['Requirements']['value'])}

	Deductions:
		${bad} Letters Only (${data.results['LettersOnly']['count']}):				${colorise(data.results['LettersOnly']['value'])}
		${bad} Numbers Only (${data.results['NumbersOnly']['count']}):				${colorise(data.results['NumbersOnly']['value'])}
		${bad} Repeat Characters (${data.results['RepeatCharacters']['count']}):			${colorise(data.results['RepeatCharacters']['value'])}
		${bad} Consecutive Uppercase Letters (${data.results['ConsecutiveUppercaseLetters']['count']}):		${colorise(data.results['ConsecutiveUppercaseLetters']['value'])}
		${bad} Consecutive Lowercase Letters (${data.results['ConsecutiveLowercaseLetters']['count']}):		${colorise(data.results['ConsecutiveLowercaseLetters']['value'])}
		${bad} Consecutive Numbers (${data.results['ConsecutiveNumbers']['count']}):			${colorise(data.results['ConsecutiveNumbers']['value'])}
		${bad} Sequential Letters (${data.results['SequentialLetters']['count']}):			${colorise(data.results['SequentialLetters']['value'])}
		${bad} Sequential Numbers (${data.results['SequentialNumbers']['count']}):			${colorise(data.results['SequentialNumbers']['value'])}
		${bad} Sequential Symbols (${data.results['SequentialSymbols']['count']}):			${colorise(data.results['SequentialSymbols']['value'])}
	`
}

function colorise(value, base=100){
	if (value > base*0.9){
		return chalk.green(value)
	} else if (value > base*0.6){
		return chalk.cyan(value)
	} else if (value > base*0.3){
		return chalk.yellow(value)
	} else {
		return chalk.red(value)
	}
}
