YUI.add("text-wordbreak",function(e,t){var n=e.Text,r=n.Data.WordBreak,i=0,s=1,o=2,u=3,a=4,f=5,l=6,c=7,h=8,p=9,d=10,v=11,m=12,g=[new RegExp(r.aletter),new RegExp(r.midnumlet),new RegExp(r.midletter),new RegExp(r.midnum),new RegExp(r.numeric),new RegExp(r.cr),new RegExp(r.lf),new RegExp(r.newline),new RegExp(r.extend),new RegExp(r.format),new RegExp(r.katakana),new RegExp(r.extendnumlet)],y="",b=new RegExp("^"+r.punctuation+"$"),w=/\s/,E={getWords:function(e,t){var n=0,r=E._classify(e),i=r.length,s=[],o=[],u,a,f;t||(t={}),t.ignoreCase&&(e=e.toLowerCase()),a=t.includePunctuation,f=t.includeWhitespace;for(;n<i;++n)u=e.charAt(n),s.push(u),E._isWordBoundary(r,n)&&(s=s.join(y),s&&(f||!w.test(s))&&(a||!b.test(s))&&o.push(s),s=[]);return o},getUniqueWords:function(t,n){return e.Array.unique(E.getWords(t,n))},isWordBoundary:function(e,t){return E._isWordBoundary(E._classify(e),t)},_classify:function(e){var t,n=[],r=0,i,s,o=e.length,u=g.length,a;for(;r<o;++r){t=e.charAt(r),a=m;for(i=0;i<u;++i){s=g[i];if(s&&s.test(t)){a=i;break}}n.push(a)}return n},_isWordBoundary:function(e,t){var n,r=e[t],m=e[t+1],g;return t<0||t>e.length-1&&t!==0?!1:r===i&&m===i?!1:(g=e[t+2],r!==i||m!==o&&m!==s||g!==i?(n=e[t-1],r!==o&&r!==s||m!==i||n!==i?r!==a&&r!==i||m!==a&&m!==i?r!==u&&r!==s||m!==a||n!==a?r!==a||m!==u&&m!==s||g!==a?r===h||r===p||n===h||n===p||m===h||m===p?!1:r===f&&m===l?!1:r===c||r===f||r===l?!0:m===c||m===f||m===l?!0:r===d&&m===d?!1:m!==v||r!==i&&r!==a&&r!==d&&r!==v?r!==v||m!==i&&m!==a&&m!==d?!0:!1:!1:!1:!1:!1:!1):!1)}};n.WordBreak=E},"patched-v3.16.0",{requires:["array-extras","text-data-wordbreak"]});
