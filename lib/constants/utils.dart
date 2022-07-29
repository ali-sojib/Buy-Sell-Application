import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void showSnackBar(BuildContext context, String text) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(text),
    ),
  );
}

//making future list type file
//when i call pickImages function
//then get a list of file type images
Future<List<File>> pickImages() async {
  //making empty list of file type
  List<File> images = [];
  try {
    var filess = await FilePicker.platform.pickFiles(
      //pick only image file
      type: FileType.image,
      //multipule images selection
      allowMultiple: true,
    );
    //chaking if not null & files list not empty
    if (filess != null && filess.files.isNotEmpty) {
      //looping through files list for adding into images
      for (int i = 0; i < filess.files.length; i++) {
        //adding file path to images file type list
        images.add(File(filess.files[i].path!));
      }
    }
  } catch (e) {
    debugPrint(e.toString());
  }
  return images;
}
