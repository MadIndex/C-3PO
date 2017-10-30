/*eslint-disable*/
module.exports = function(data)
{
/*
   // ---------------
   // Translate last
   // ---------------

   if (translateArgs.startsWith("last"))
   {
      //
      // Get number of chains of current channel from chain cache
      //

      var chainCount = dbChains[channel.id].length;

      //
      // There are no mesasges: send error
      //

      if (chainCount < 1)
      {
         sendBox({
            channel: channel.id,
            color: colorWarn,
            text: text.errNoMsgs
         });
         return;
      }

      //
      // Set default command arguments
      //

      var args = translateArgs.replace("last", "").trim();
      toLang = defaultLanguage;
      var multi = false;
      var single = true;
      var position = "-1";
      var output = "";

      //
      // Get language args through regex
      //

      toLang = (/to\s*\[?([a-z,\s]*)/i).exec(args);

      // Switch to default language if regex fails

      if (!toLang)
      {
         toLang = defaultLanguage;
      }

      // Convert language string to array

      else
      {
         toLang = toLang[1].split(",");

         // Throw error if too many languages requested

         if (toLang.length > maxMulti)
         {
            sendBox({
               channel: channel.id,
               color: colorErr,
               text: text.errMaxMulti(maxMulti)
            });
            return;
         }

         // Convert to object `{valid, invalid}`

         toLang = langCheck(toLang);

         if (toLang.valid.length === 0)
         {
            var invErr = text.errBadLang(toLang.invalid);
            sendBox({
               channel: channel.id,
               color: colorErr,
               text: invErr
            });
            return;
         }

         // Convert object back to single string
         // If there was only one valid language

         if (toLang.valid.length === 1 && toLang.invalid.length === 0)
         {
            toLang = toLang.valid[0];
         }

         // Update lang type for multiple languages

         else
         {
            multi = true;
         }
      }

      //
      // Analyze position value
      //

      position = (/-?\d+/i).exec(args);

      // rest to default if regex fails

      if (!position)
      {
         position = "-1";
      }

      position = position.toString();

      // detect mode

      if (!position.startsWith("-"))
      {
         single = false;
      }

      // convert to absolute number

      position = Math.round(Math.abs(position));

      // always start at 1 for loop to work properly

      if (position < 1)
      {
         position = 1;
      }

      // prevent requests of non-existent messages in cache

      if (position > chainCount)
      {
         position = chainCount;
      }

      //
      // Debug command
      //

      console.log(
         `Pos: ${position} |
         To: ${toLang}:${multi} |
         Single: ${single} |
         Chains: ${chainCount}`
      );

      //
      // Translate single chain only
      //

      if (single)
      {
         var chain = dbChains[channel.id][position - 1];
         author = dbMessages[channel.id][chain[0] - 1].author;

         output = "";
         chain.forEach(function(msgID)
         {
            output += "\n";
            output += dbMessages[channel.id][msgID - 1].content;
         });

         //
         // Translate single chain to multiple languages
         //

         if (multi)
         {
            sendMulti({
               channel: channel.id,
               author: author,
               valid: toLang.valid,
               invalid: toLang.invalid,
               original: output
            });
            return;
         }

         //
         // Translate single chain to single language
         //

         return translate(output, {to: toLang}).then(res =>
         {
            sendBox({
               channel: channel.id,
               author: author,
               text: fn.translateFix(res.text),
               original: output,
               toLang: toLang,
               fromLang: res.from.language.iso,
               dyk: true
            });
            return;
         });
      }

      //
      // Translate all requested chains
      //


      //
      // Prevent multiple languages when translating many chains
      //

      if (multi)
      {
         sendBox({
            channel: channel.id,
            color: colorErr,
            text: text.errMultiDisabled
         });
         return;
      }

      //
      // Prevent translating chains beyond allowed number
      //

      if (position > maxChains)
      {
         position = maxChains;
         sendBox({
            channel: channel.id,
            color: colorWarn,
            text: text.errMaxChains(maxChains)
         });
      }

      //
      // Set bot to writing mode
      //

      isWriting = true;
      //botStatus("writing", channel);

      //
      // Loop through channel chains
      //

      for (var i = position - 1; i >= 0; i--)
      {
         chain = dbChains[channel.id][i];
         var chainFirst = dbMessages[channel.id][chain[0]-1];
         author = chainFirst.author;
         var time = chainFirst.createdTimestamp;

         //
         // Add the content of each message to output
         // Resets on each iteration
         //

         output = "";

         chain.forEach(msgID =>
         {
            var content = dbMessages[channel.id][msgID-1].content;

            if (content === chainFirst.content)
            {
               output += `[${time}]`;
               output += content;
            }

            else
            {
               output += "\n";
               output += content;
            }
         });

         //
         // Add chain translation object to buffer queue
         //

         var opts = {
            to: toLang,
            raw: true
         };

         translate(output, opts).then(res =>
         {
            var raw = JSON.parse(`[${res.raw}]`);
            var content = fn.translateFix(res.text);
            var ts = fn.getTimeFromStr(content);
            content = fn.remTimeFromStr(content, ts);
            var original = fn.remTimeFromStr(raw[0][0][0][1], ts);

            fn.buffer("push", {
               order: ts,
               langTo: toLang,
               langFrom: res.from.language.iso,
               content: content,
               original: original,
               author: author
            });

            //
            // Callback once all chains resolved in buffer
            //

            if (fn.buffer("len") === position)
            {
               // Reorder array by timestamp key

               var sorted = fn.sortByKey(fn.buffer("arr"), "order");

               // Reset Buffer

               fn.buffer("reset");

               // Send translation to channel

               sorted.forEach(function(chain)
               {
                  sendBox({
                     channel: channel.id,
                     text: chain.content,
                     author: chain.author,
                     original: chain.original,
                     fromLang: chain.langFrom,
                     toLang: chain.langTo,
                     buffer: sorted.length,
                     order: chain.order
                  });
               });

               // Finish writing mode

               isWriting = false;
               return;
            }
         });
      }

      // loop is over
      return;
   }
*/
};