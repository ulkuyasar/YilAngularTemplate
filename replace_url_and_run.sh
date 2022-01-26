sed -i '/apiUrl/c\    apiUrl:  \"'$apiUrl'\",' /usr/share/nginx/html/assets/environment.js
sed -i '/refreshTokenUrl/c\    refreshTokenUrl:  \"'$refreshTokenUrl'\",' /usr/share/nginx/html/assets/environment.js

cat /usr/share/nginx/html/assets/environment.js
exec nginx -g 'daemon off;'



//docker içine url guncellemelerı ıcın yazılıyor
//deploy asamasında kulanırsın
