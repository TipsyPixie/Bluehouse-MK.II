function go_search(keyword) {

    if (!keyword) {
        return;
    }

    document.getElementById('unifiedSearchBox').setAttribute('value', keyword);
    document.getElementById('unified_search_form').submit();
}

function go_view(url, seq) {

    document.location.href = url + "?srh[view_mode]=detail&srh[seq]=" + seq;
}
