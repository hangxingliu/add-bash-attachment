# add-bash-attachment

[![Build Status](https://travis-ci.org/hangxingliu/add-bash-attachment.svg?branch=master)](https://travis-ci.org/hangxingliu/add-bash-attachment)

A Node.js utils/module be used for add attachment files into bash script.

## Install

``` bash
npm install add-bash-attachment
```

## Usage

``` bash
add-bash-attachment --input raw.sh \
	--file signs.key --file sources.list \
	--output install.sh
```

## Principle

Prepend bash function `get_bash_attachment` and attachment contents as base64 string.


## Author

👨‍💻 [@hangxingliu (Liu Yue)](https://github.com/hangxingliu)

## License

[GPL-3.0](LICENSE)
