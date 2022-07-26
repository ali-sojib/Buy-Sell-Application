import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final int maxLines;

  const CustomTextField({
    Key? key,
    required this.controller,
    required this.hintText,
    /*very *IMPORTENT*
      that means by default mexline always be 1
      but when some one pass mexline value it will
      take that value and set it to maxLine proparty
    */
    this.maxLines = 1,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        border: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.black54),
        ),
        enabledBorder: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.black54),
        ),
      ),
      validator: (val) {
        if (val == null || val.isEmpty) {
          return 'Enter your $hintText';
        }
        /* my code
        my own style for password ui velidation*/
        if (hintText == "Password") {
          if (controller.text.length < 6) {
            return 'Plase Enter a long password';
          }
        }
        return null;
      },
      maxLines: maxLines,
    );
  }
}
