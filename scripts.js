function go_search(keyword){

    if ( !keyword ) {
        return;
    }

    document.getElementById('unifiedSearchBox').setAttribute('value', keyword);
    document.getElementById('unified_search_form').submit();
}