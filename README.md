# tenzr_health_take_home
This is a take home assignment as part of the application process for TenzrHealth

## Usage

Clone this repository in a directory of your choosing:

```git clone https://github.com/keanelekenns/tenzr_health_take_home.git```

Ensure you have nodejs installed (this code was tested with v16.14.2 LTS gallium).

Then run ```node . <filename>``` or ```npm start <filename>```

The filename should be a relative path to an input file according to the [requirements specification](requirements.txt).
The output will be printed to the console according to the same requirements file.

## Example

Running ```node . test_files/test.txt```

Outputs:

```
{
  T: 'heca',
  t: '',
  e: 'hat',
  is: 't',
  he: 'h',
  at: 'i',
  nt: 'h',
  ec: 'a'
}
average: 1.63
```