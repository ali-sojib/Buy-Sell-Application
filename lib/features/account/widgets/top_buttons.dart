import 'package:buy_sell_appliction/features/account/widgets/account_page_button.dart';
import 'package:flutter/material.dart';

class TopButtons extends StatefulWidget {
  const TopButtons({Key? key}) : super(key: key);

  @override
  State<TopButtons> createState() => _TopButtonsState();
}

class _TopButtonsState extends State<TopButtons> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            AccountPageButton(
              text: 'Your Orders',
              onTap: () {},
            ),
            AccountPageButton(
              text: 'Turn Seller',
              onTap: () {},
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            AccountPageButton(
              text: 'Log Out',
              onTap: () {},
            ),
            AccountPageButton(
              text: 'Your Wish list',
              onTap: () {},
            ),
          ],
        )
      ],
    );
  }
}
