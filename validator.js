// Đối tượng
function Validator(options) {
    function getparent(element, selector) {
         while (element.parentElement) {
             if(element.parentElement.matches(selector)) {
                 return element.parentElement;
             }
             element = element.parentElement;
         }
    }
    var selectorRules = {};
    // thông báo trường nhập đã đạt hay chưa
    function Validate(inputElement , rule) {
        var errorMessage;
        var errorElement = getparent(inputElement, options.formGroubSelector).querySelector(options.errorSelector);
        // lấy ra mảng chứa các quy tắc có KEY là test của inputElement
        // lặp qua và kiểm tra
        var rules = selectorRules[rule.selector];
        for(var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                         formElement.querySelector(rule.selector + ':checked')
                    );
                break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if(errorMessage) {
                break;
            }
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            getparent(inputElement, options.formGroubSelector).classList.add('invalid');
        }else {
            errorElement.innerText = ''; 
            getparent(inputElement, options.formGroubSelector).classList.remove('invalid');
        }
        return !!errorMessage;
    }
    // Lấy ra element form
    var formElement = document.querySelector(options.form);
    if(formElement) {

        // xử lý submit của thẻ form
        var isFormValid = true;
        formElement.onsubmit = function(e) {
            e.preventDefault();
            options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var isvalid = Validate(inputElement , rule);
               if(isvalid) {
                   isFormValid = false;
               }
            });
            if(isFormValid) {
                // submit với javascript
                if(typeof options.onSubmit === 'function'){
                    var enabledInput = formElement.querySelectorAll('[name]');
                    var formvalues = Array.from(enabledInput).reduce(function(objects, input) {
                        switch (input.type) {
                            case 'checkbox':
                                if(!Array.isArray(objects[input.name])){
                                    objects[input.name] = [];
                                }
                                if(input.matches(':checked')) {
                                    objects[input.name].push(input.value);
                                }
                            break;
                            case 'radio':
                                if(input.matches(':checked')) {
                                    objects[input.name] = input.value;
                                }
                            break;
                            case 'file':
                                objects[input.name] = input.files;
                            break;
                            default:
                                objects[input.name] = input.value;
                        }
                        return objects;
                    },{});
                    options.onSubmit(formvalues);
                }
                // submit với mặc đinh của html
                else {
                    formElement.submit();
                }
            }else{
                isFormValid = true;
            }
        }

        options.rules.forEach(function(rule) {
            // lấy ra các quy tắc key = test của từng inputElement
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            inputElements.forEach(function(inputElement) {
                inputElement.onblur = function() {
                    Validate(inputElement , rule);
                }
                
                inputElement.oninput = function() {
                    var errorElement = getparent(inputElement, options.formGroubSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getparent(inputElement, options.formGroubSelector).classList.remove('invalid');
                }
            });
        });
    }
}
// Định nghĩa các quy tắc của đối tượng
Validator.isRequired = function (selector, message) {
     return {
        selector: selector,
        test : function (value) {
            return value? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}
Validator.isEmail = function (selector , message) {
    return {
        selector: selector,
        test : function (value) {
            var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(value)? undefined : message || 'Trường này phải là email';
        }
    }
}
Validator.isMinlength = function (selector , min , message) {
    return {
        selector: selector,
        test : function (value) {
            return value.length >= min? undefined : message || `Mật khẩu phải từ ${min} kí tự`
        }
    }
}
Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test : function (value) {

        }
    }
}
Validator.isConfirmed = function (selector , getvalueConfirmed , message) {
    return {
        selector: selector,
        test : function (value) {
            return value == getvalueConfirmed()? undefined : message || 'Giá trị nhập vào không hợp lệ';
        }
    }
}